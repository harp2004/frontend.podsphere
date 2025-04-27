import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP, Step 3: New Password
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleEmailSubmit = async () => {
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
            alert(response.data.message);
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.message || 'Error sending OTP');
        } finally {
            setLoading(false);
        }
    };
    const handleOtpSubmit = async () => {
      try {
          setLoading(true);
          const response = await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
          alert(response.data.message);
          setStep(3);
      } catch (err) {
          setError(err.response?.data?.message || 'Invalid OTP');
      } finally {
          setLoading(false);
      }
  };
  
    const handlePasswordReset = async () => {
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:5000/api/auth/reset-password', { email, newPassword, otp });
            alert(response.data.message);
            setStep(1);
            setEmail('');
            setOtp('');
            setNewPassword('');
        } catch (err) {
            setError(err.response?.data?.message || 'Error resetting password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                {error && <p className="text-red-500 text-sm">{error}</p>}

                {step === 1 && (
                    <div>
                        <h2 className="text-xl font-bold">Forgot Password</h2>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border rounded-lg p-2 mt-2"
                        />
                        <button 
                            onClick={handleEmailSubmit} 
                            className="w-full bg-yellow-500 text-white p-2 rounded-lg mt-4"
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : 'Send OTP'}
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <h2 className="text-xl font-bold">Enter OTP</h2>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full border rounded-lg p-2 mt-2"
                        />
                        <button 
                            onClick={handleOtpSubmit} 
                            className="w-full bg-yellow-500 text-white p-2 rounded-lg mt-4"
                            disabled={loading}
                        >
                            {loading ? 'Verifying...' : 'Verify OTP'}
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <h2 className="text-xl font-bold">Reset Password</h2>
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full border rounded-lg p-2 mt-2"
                        />
                        <button 
                            onClick={handlePasswordReset} 
                            className="w-full bg-yellow-500 text-white p-2 rounded-lg mt-4"
                            disabled={loading}
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
