const LocationSearchPanel = (props) => {
  // Sample array for location
  const locations = [
    "24B, Near Milan's cafe, Dahisar (East), Mumbai",
    "18/D, Near Isha cafe, Dahisar (East), Mumbai",
    "24B, Near Thakur Mall, Dahisar, Mumbai",
    "19/D, Near Swaminarayan cafe, Dahisar (East), Mumbai",
  ];

  return (
    <div>
      {/* This is just a sample data */}
      {locations.map((elem, index) => (
        <div
          key={index}
          onClick={() => {
            props.setVehiclePanel(true);
            props.setPanelOpen(false);
          }}
          className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start"
        >
          <h2 className="bg-[#eee] h-10 flex items-center justify-center w-12 rounded-full">
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className="font-medium">{elem}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
