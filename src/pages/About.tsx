import React from "react";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About 페이지</h1>
        <p className="text-lg text-gray-600 mb-8">
          이 페이지는 React Router를 사용하여 구현된 About 페이지입니다. 멋진
          라우팅 기능을 확인해보세요!
        </p>
        <div className="space-x-4">
          <a
            href="/"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            홈으로 돌아가기
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
