import React, { useState } from "react";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [textNotice, setTextNotice] = useState("");
  const [imageNotice, setImageNotice] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(true); // Controls form visibility

  const handleTextChange = (e) => {
    setTextNotice(e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageNotice(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const publishNotice = () => {
    if (!textNotice && !imageNotice) {
      alert("Please enter a text notice or upload an image.");
      return;
    }

    const newAnnouncement = { text: textNotice, image: imageNotice };
    setAnnouncements([...announcements, newAnnouncement]);

    // Clear input fields and hide form
    setTextNotice("");
    setImageNotice(null);
    setIsFormVisible(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Announcements & Notices
      </h2>

      {/* Form Section (Collapsible) */}
      {isFormVisible && (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl fade-in">
          <textarea
            value={textNotice}
            onChange={handleTextChange}
            placeholder="Write your announcement..."
            className="border p-3 w-full h-32 text-lg rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="file"
            onChange={handleImageUpload}
            className="mt-3 p-2 w-full bg-gray-50 border rounded-lg"
          />
          <button
            onClick={publishNotice}
            className="mt-5 w-full px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Publish Announcement
          </button>
        </div>
      )}

      {/* Display Announcements */}
      <div className="w-full max-w-3xl mt-6">
        {announcements.length > 0 ? (
          announcements.map((announcement, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 mb-4 fade-in"
            >
              {announcement.image && (
                <img
                  src={announcement.image}
                  alt="Notice"
                  className="w-full rounded-lg shadow-lg mb-3"
                />
              )}
              {announcement.text && (
                <div className="marquee-container">
                  <div className="marquee text-2xl font-bold text-red-600">
                    {announcement.text}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-6">No announcements yet.</p>
        )}
      </div>

      {/* Collapsible Banner to Add More Announcements */}
      {!isFormVisible && (
        <button
          onClick={() => setIsFormVisible(true)}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
        >
          + Add Another Announcement
        </button>
      )}

      {/* Animations */}
      <style>
        {`
          .fade-in {
            animation: fadeIn 0.8s ease-in-out;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .marquee-container {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            padding: 10px 0;
            background: rgba(255, 0, 0, 0.1);
            border-radius: 8px;
          }

          .marquee {
            display: inline-block;
            animation: marquee 10s linear infinite alternate;
            padding: 5px;
          }

          @keyframes marquee {
            from { transform: translateX(100%); }
            to { transform: translateX(-100%); }
          }
        `}
      </style>
    </div>
  );
};

export default Announcements;