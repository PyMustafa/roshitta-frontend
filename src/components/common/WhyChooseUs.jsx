const WhyChooseUs = () => {
    const features = [
      {
        title: "EFFICIENCY",
        description: "Streamlined appointment scheduling that fits into your busy lifestyle."
      },
      {
        title: "CONVENIENCE",
        description: "Access to a network of trusted healthcare professionals in your area."
      },
      {
        title: "PERSONALIZATION",
        description: "Tailored recommendations and reminders to help you stay on top of your health."
      }
    ];
  
    return (
      <section className="my-10 px-4">
        <div className="text-xl my-4 text-left px-4 md:px-0">
          <p>
            WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
          </p>
        </div>
  
        <div className="flex flex-col md:flex-row mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="border border-gray-200 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] text-left hover:bg-[#5F6FFF] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer w-full"
            >
              <b className="text-base">{feature.title}:</b>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default WhyChooseUs;
  