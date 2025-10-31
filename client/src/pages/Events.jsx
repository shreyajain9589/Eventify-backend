import React, { useEffect, useState } from 'react';
import API from '../services/api';
import EventCard from '../components/EventCard';
import Footer from '../components/Footer';
import io from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_URL?.replace('/api','') || 'http://localhost:5000');

export default function Events() {
  const [events, setEvents] = useState([]);
  const [q, setQ] = useState('');
  const [location, setLocation] = useState('');

  const fetchEvents = async () => {
    try {
      const res = await API.get('/events', { params: { q, location } });
      setEvents(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch events');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    socket.on('seatUpdate', (data) => {
      setEvents(prev => prev.map(e => e._id === data.eventId ? { ...e, available_seats: data.available_seats } : e));
    });
    return () => socket.off('seatUpdate');
  }, []);

  const onSearch = async (e) => {
    e.preventDefault();
    fetchEvents();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <form onSubmit={onSearch} className="flex flex-col md:flex-row gap-2 mb-6">
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search events"
            className="border p-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="Location"
            className="border p-2 rounded w-full md:w-48 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">Search</button>
        </form>

        <div className="grid md:grid-cols-3 gap-6">
          {events.map(ev => (
            <EventCard key={ev._id} event={ev} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
