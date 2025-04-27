import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const plans = {
  '1_month': { label: '1 Month', price: 5 },
  '6_months': { label: '6 Months', price: 25 },
  '1_year': { label: '1 Year', price: 45 },
};

const Upgrade = () => {
  const { user, setUser } = useOutletContext();
  const [selectedPlan, setSelectedPlan] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  useEffect(() => {
    if (user?.role === 'podcaster') {
      setSubscribed(true);
      setMessage('You’re already a Podcaster! 🎉');
    }
  }, [user]);

  const handleSubscribe = () => {
    if (!selectedPlan) return;
    setIsModalOpen(true);
  };
  const handlePaymentSuccess = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${user._id}/upgrade`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`, // make sure token is included if you use protect middleware
        },
        body: JSON.stringify({ plan: selectedPlan }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        setUser(data.user); // update user context with the upgraded user
        setSubscribed(true);
        setMessage('You’re now a Podcaster! 🎉');
        setIsModalOpen(false);
      } else {
        throw new Error(data.message || 'Something went wrong.');
      }
    } catch (err) {
      setMessage('Upgrade failed. Please try again.');
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  };
  

  const handlePaymentCancel = () => {
    setIsModalOpen(false);
    setMessage('Payment process was cancelled.');
  };

  return (
    <div className="p-6 bg-[#fffbe6] min-h-screen text-[#4a2e00]">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-md">
        <h1 className="text-4xl font-bold mb-4 text-center text-[#c68c00]">Become a Podcaster 🎙️</h1>
        <p className="text-center text-lg mb-6 text-[#5c3d00]">
          Unlock your potential and start sharing your voice with the world.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-10 text-center">
          <div className="bg-yellow-100 p-4 rounded-xl">
            <h3 className="font-semibold text-lg mb-1">🎧 Upload Podcasts</h3>
            <p className="text-sm">Easily upload and manage your podcast episodes.</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-xl">
            <h3 className="font-semibold text-lg mb-1">📊 Analytics</h3>
            <p className="text-sm">Track plays, likes, and audience feedback.</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-xl">
            <h3 className="font-semibold text-lg mb-1">🛠️ Full Control</h3>
            <p className="text-sm">Edit, delete, and organize episodes anytime.</p>
          </div>
        </div>

        {!subscribed && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center text-[#c68c00]">Choose Your Plan</h2>
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {Object.entries(plans).map(([key, { label, price }]) => (
                <div
                  key={key}
                  onClick={() => setSelectedPlan(key)}
                  className={`cursor-pointer border-2 p-6 rounded-xl transition-all duration-300 text-center ${
                    selectedPlan === key
                      ? 'border-yellow-600 bg-yellow-200'
                      : 'border-gray-300 hover:bg-yellow-100'
                  }`}
                >
                  <h3 className="text-xl font-semibold mb-2">{label}</h3>
                  <p className="text-lg font-bold text-[#8b5e00]">${price}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {selectedPlan && !subscribed && (
          <div className="text-center mt-6">
            <p className="mb-4 text-md">
              Selected Plan: <span className="font-bold">{plans[selectedPlan].label}</span> –{' '}
              <span className="text-[#b36b00] font-semibold">${plans[selectedPlan].price}</span>
            </p>
            <button
              onClick={handleSubscribe}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-full transition"
              disabled={loading}
            >
              {loading ? 'Upgrading...' : 'Subscribe & Upgrade'}
            </button>
          </div>
        )}

        {message && (
          <p className={`mt-6 text-center font-semibold ${subscribed ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </div>

      {/* Payment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl w-[400px] shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Choose Payment Method</h2>
            <p className="text-center mb-4">
              You’re about to pay <span className="font-bold">${plans[selectedPlan].price}</span> for the{' '}
              <span className="font-bold">{plans[selectedPlan].label}</span> plan.
            </p>

            <div className="mb-4">
              <div className="flex justify-center gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                  />
                  Card
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="qr"
                    checked={paymentMethod === 'qr'}
                    onChange={() => setPaymentMethod('qr')}
                  />
                  QR Code
                </label>
              </div>
            </div>

            {paymentMethod === 'card' && (
              <div className="space-y-3 mb-4">
                <input
                  type="text"
                  placeholder="Card number"
                  className="w-full border p-2 rounded-md"
                  maxLength={19}
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-1/2 border p-2 rounded-md"
                    maxLength={5}
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="w-1/2 border p-2 rounded-md"
                    maxLength={3}
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'qr' && (
              <div className="flex justify-center mb-4">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=MockPaymentLink"
                  alt="QR Code"
                  className="rounded-md"
                />
              </div>
            )}

            <div className="flex justify-center gap-4">
              <button
                onClick={handlePaymentSuccess}
                className="bg-green-500 text-white py-2 px-6 rounded-lg"
              >
                Pay & Upgrade
              </button>
              <button
                onClick={handlePaymentCancel}
                className="bg-red-500 text-white py-2 px-6 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upgrade;
