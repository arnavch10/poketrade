/*
This is the main page of the application.
It is the dashboard where users can see different locations and attractions based on the 

The page consists of a search bar where users can input a destination and via a 
Hugging Face API call, the app returns a list of attractions in that destination.

The page also includes a map that shows the locations of the attractions
via the Google Maps API. 

This allows the users to have a visual representation of where the attractions are located.
*/


import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useStateContext } from '@/context/StateContext';
import { useRouter } from 'next/router';
import DashboardNavbar from '@/components/Dashboard/DashboardNavbar';
import Searchbar from '@/components/Dashboard/Searchbar';
import { createSearch } from '@/backend/Database';
import Map from '@/components/Dashboard/Map';
import { DotLottie, DotLottieReact } from '@lottiefiles/dotlottie-react';

const Dashboard = () => {
  const { user } = useStateContext();
  const router = useRouter();
  const [destinations, setDestinations] = useState([]);
  const [locations, setLocations] = useState([]);
  const [history, setHistory] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/');
    }

    const fetchSearchHistory = async () => {
      try {
        const pastHistory = await getSearchHistory(user.uid);
        setHistory(pastHistory);
      } catch (err) {
        console.log("Unable to fetch history: ", err);
      }
    };

    fetchSearchHistory();
  }, [user]);

  // parser for markdown
  const parseDestinationsFromMarkdown = (markdown) => {
    const lines = markdown.split('\n'); // get each line of markdown
    const results = [];

    lines.forEach((line) => {
      const match = line.match(/^\|\s*\d+\s*\|\s*\*\*(.+?)\*\*\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|/); 
      if (match) { // if the regex matches, get name, history, tips
        results.push({
          name: match[1].trim(),
          history: match[2].trim(),
          tips: match[3].trim(),
        });
      }
    });

    return results;
  };

  const handleSearch = async (query) => {
    try {
      // resetting states for new search
      setNotFound(false);
      setDestinations([]);
      setShowMap(false);
      
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, userId: user.uid }),
      });

      const data = await res.json();
      const parsed = parseDestinationsFromMarkdown(data.result);

      // save search
      await createSearch(user.uid, query, parsed);

      setDestinations(parsed);
      setLocations(data.locations);

      if (!parsed || parsed.length === 0) {
        setDestinations([]);
        alert("Sorry about that. We don't have information for that destination.");
        setNotFound(true); // display different animation when api returns nothing
        return;
      }

      // found = true
      setNotFound(false);
      const mapRes = await fetch('/api/places', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
      const mapData = await mapRes.json();
      setLocations(mapData.locations);
      setShowMap(true);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  return (
    <>
      <DashboardNavbar />
      <Section>
        <Searchbar placeholder="Travel to new destinations..." onSearch={handleSearch} />

        {/* Default when nothing is there */}
        {destinations.length === 0 && !notFound && (
          <Container>
            <Header>Discover new places to travel and memories to make!</Header>
            <Animation>
              <DotLottieReact 
                src="https://lottie.host/dcbcb85b-d6f4-4f8b-a958-31a155f457ee/QVWKpuofd1.lottie"
                loop
                autoplay
                style={{height: '500px', width: '500px'}}
              />
            </Animation>
          </Container>
        )}

        {/* When the api returns nothing */}
        {notFound && (
          <Container>
            <Header>Sorry about that, but nothing was found!</Header>
            <Animation>
              <DotLottieReact 
                src="https://lottie.host/4b1dddb0-d653-4a9b-ad7f-c34f84d126bd/AIygqYLRbE.lottie"
                loop
                autoplay
                style={{height: '500px', width: '500px'}}
              />
            </Animation>
          </Container>
        )}

        {destinations.length > 0 && (
          <ResultsContainer>
            <h2>Search Results:</h2>
            {destinations.map((dest, i) => (
              <DestinationCard key={i}>
                <PlaceName>
                  <a href={`https://www.google.com/search?q=${encodeURIComponent(dest.name)}`} target="_blank" rel="noopener noreferrer">
                    {dest.name}
                  </a>
                </PlaceName>
                <History>{dest.history}</History>
                <Importance>Importance: {dest.tips}</Importance>
              </DestinationCard>
            ))}
            {showMap && locations.length > 0 && (
              <Map locations={locations} />
            )}
          </ResultsContainer>
        )}
      </Section>
    </>
  );
};

export default Dashboard;

const Section = styled.section`
  width: 100%;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ResultsContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const DestinationCard = styled.div`
  background: #f0f9ff;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.5);
`;

const PlaceName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const History = styled.p`
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 0.5rem;
`;

const Importance = styled.p`
  font-size: 13px;
  font-style: italic;
  color: #555;
`;

const Container = styled.div`
  margin-top: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #1e3a8a;
`;

const Animation = styled.div`
  width: 100%;
  max-width: 400px;
`;