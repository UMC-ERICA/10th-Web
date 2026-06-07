import React from "react";
import { useState } from "react";

const SearchBar = () => {
  const [formData, setFormData] = useState({
    query: "",
    adultContent: false,
  });
  const [language, setLanguage] = useState("ko-KR");
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  };

  return (
    <form className="w-full max-w-md mx-auto mt-4">
      <div>
        성인 콘텐츠{" "}
        <input
          type="checkbox"
          name="adultContent"
          checked={formData.adultContent}
          onChange={handleChange}
        />
      </div>

      <input
        type="text"
        placeholder="Search..."
        name="query"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={formData.query}
      />
      <div>
        <select
          name="language"
          value={language}
          onChange={handleLanguageChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
        >
          <option className="text-gray-700" value="ko-KR">
            한국어
          </option>
          <option className="text-gray-700" value="en-US">
            영어
          </option>
          <option className="text-gray-700" value="ja-JP">
            일본어
          </option>
        </select>
      </div>
    </form>
  );
};

export default SearchBar;
