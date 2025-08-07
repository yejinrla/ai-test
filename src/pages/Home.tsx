import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          홈페이지에 오신 것을 환영합니다!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          React Router를 사용한 멋진 애플리케이션입니다.
        </p>
        <div className="space-x-4">
          <a
            href="/about"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            About 페이지로 이동
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home; 