import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          요청하신 페이지가 존재하지 않습니다.
        </p>
        <div className="space-x-4">
          <a
            href="/"
            className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            홈으로 돌아가기
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
