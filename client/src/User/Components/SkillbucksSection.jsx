// client/src/User/Components/SkillbucksSection.jsx
import React from 'react';

const SkillbucksSection = () => {
  const skillbucksPlans = [
    {
      id: 1,
      title: 'Earn Free Skillbucks',
      description: 'Share your knowledge and teach skills to earn Skillbucks. The more you teach, the more you earn!',
      action: 'Start Teaching',
      price: '$0',
      skillbucksAmount: 'Free',
      icon: '/src/client/public/assets/free-skillbucks-icon.png' // Replace with your icon path if you have one
    },
    {
      id: 2,
      title: 'Basic Skillbucks Pack',
      description: 'Get a quick boost of Skillbucks to start learning. Perfect for exploring new skills.',
      action: 'Buy Basic Pack',
      price: '$5', // Replace with actual price
      skillbucksAmount: '1', // Example amount - adjust
      icon: '/src/client/public/assets/basic-skillbucks-icon.png' // Replace with your icon path
    },
    {
      id: 3,
      title: 'Premium Skillbucks Bundle',
      description: 'Maximize your learning potential with a large Skillbucks bundle. Unlock advanced courses and mentorship.',
      action: 'Buy Premium Bundle',
      price: '$20', // Replace with actual price
      skillbucksAmount: '2', // Example amount - adjust
      icon: '/src/client/public/assets/premium-skillbucks-icon.png' // Replace with your icon path
    }
  ];

  return (
    <div className="p-6 container mx-auto mt-8">
      <h2 className="text-3xl font-bold text-center text-secondary mb-8">Get Skillbucks</h2>
      <p className="text-gray-600 text-center mb-12">
        Use Skillbucks to learn new skills from other users on SkillHub. Choose a plan that suits you best!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {skillbucksPlans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              {/* <div className="flex items-center justify-center h-16 mb-4"> 
                {plan.icon && <img src={plan.icon} alt={plan.title} className="h-16 w-auto" />} 
                {!plan.icon && <div className="w-16 h-16 bg-gray-200 rounded-full"></div>}  
              </div> */}
               {plan.price !== 'Free' && ( // Conditionally render price and Skillbucks amount for paid plans
                <div className="text-center mb-4">
                  <span className="text-2xl font-bold text-secondary">{plan.price}</span>
                  {plan.skillbucksAmount && <span className="text-gray-700"> - Get {plan.skillbucksAmount} Skillbucks</span>}
                </div>
              )}
              <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">{plan.title}</h3>
              <p className="text-gray-600 text-center mb-4">{plan.description}</p>
             
            </div>
            <div className="px-6 py-4 bg-gray-100 text-center">
              <button
                className="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded-full transition-colors duration-200"
              >
                {plan.action}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillbucksSection;