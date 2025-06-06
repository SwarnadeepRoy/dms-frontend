import React, { useState } from 'react';
import { Check, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const pricingPlans = [
  {
    name: 'Starter',
    price: { monthly: 9, annually: 7 },
    description: 'Perfect for individuals and small teams',
    features: [
      '10GB Storage',
      'Up to 5 users',
      'Basic document versioning',
      'Email support',
      'Mobile access',
      'Basic search',
      'No credit card required'
    ],
    cta: 'Get Started',
    popular: false
  },
  {
    name: 'Business',
    price: { monthly: 29, annually: 23 },
    description: 'Ideal for growing teams',
    features: [
      '100GB Storage',
      'Up to 50 users',
      'Advanced versioning',
      'Priority support',
      'Role-based access',
      'Advanced search',
      'API access',
      'Google Drive & Dropbox integration'
    ],
    cta: 'Start Free Trial',
    popular: true
  },
  {
    name: 'Enterprise',
    price: { monthly: 'Custom', annually: 'Custom' },
    description: 'For large organizations',
    features: [
      'Unlimited Storage',
      'Unlimited users',
      'Advanced security',
      '24/7 dedicated support',
      'Custom workflows',
      'SSO & SAML',
      'Custom integrations',
      'Dedicated account manager'
    ],
    cta: 'Contact Sales',
    popular: false
  }
];

const faqs = [
  {
    question: 'What happens if I exceed the storage limit?',
    answer: 'You\'ll be notified when you reach 80% of your storage limit. You can either upgrade your plan or purchase additional storage.'
  },
  {
    question: 'Do you offer discounts for nonprofits?',
    answer: 'Yes, we offer special pricing for registered nonprofit organizations. Please contact our sales team for more information.'
  },
  {
    question: 'Can I change my plan later?',
    answer: 'Absolutely! You can upgrade or downgrade your plan at any time. Changes will be prorated accordingly.'
  },
  {
    question: 'Is there a free trial available?',
    answer: 'Yes, the Business plan comes with a 14-day free trial. No credit card required.'
  }
];

const FeatureIcon = ({ included }) => (
  <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${included ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
    {included ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
  </span>
);

const PricingCard = ({ plan, isYearly, isPopular }) => (
  <div className={`relative flex flex-col p-8 bg-white rounded-2xl shadow-lg ${isPopular ? 'ring-2 ring-indigo-600' : 'ring-1 ring-gray-200'}`}>
    {isPopular && (
      <div className="absolute top-0 right-0 -mt-4 -mr-4 px-4 py-1 bg-indigo-600 text-white text-sm font-semibold rounded-full">
        Most Popular
      </div>
    )}
    <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
    <p className="mt-2 text-gray-600">{plan.description}</p>
    
    <div className="mt-6">
      <span className="text-4xl font-bold text-gray-900">
        {typeof plan.price.monthly === 'number' ? `$${isYearly ? plan.price.annually : plan.price.monthly}` : plan.price.monthly}
      </span>
      {typeof plan.price.monthly === 'number' && (
        <span className="text-base font-medium text-gray-500">
          /user/{isYearly ? 'year' : 'month'}
          {isYearly && plan.price.monthly !== 'Custom' && (
            <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
              Save {Math.round((1 - plan.price.annually / (plan.price.monthly * 12)) * 100)}%
            </span>
          )}
        </span>
      )}
    </div>
    
    <ul className="mt-8 space-y-4">
      {plan.features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <FeatureIcon included={true} />
          <span className="ml-3 text-gray-700">{feature}</span>
        </li>
      ))}
    </ul>
    
    <div className="mt-8">
      <button
        className={`w-full px-6 py-3 rounded-lg font-medium ${
          isPopular 
            ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
            : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
        } transition-colors`}
      >
        {plan.cta}
      </button>
    </div>
  </div>
);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="font-medium text-gray-900">{question}</h4>
        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-600">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Simple, Scalable Pricing
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Flexible plans to meet the needs of growing businesses.
          </p>
          
          {/* Billing Toggle */}
          <div className="mt-8 flex items-center justify-center">
            <span className={`mr-4 font-medium ${!isYearly ? 'text-indigo-600' : 'text-gray-500'}`}>Monthly</span>
            <button
              type="button"
              className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              role="switch"
              aria-checked={isYearly}
              onClick={() => setIsYearly(!isYearly)}
            >
              <span
                aria-hidden="true"
                className={`${isYearly ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
            <div className="ml-4">
              <span className={`font-medium ${isYearly ? 'text-indigo-600' : 'text-gray-500'}`}>Yearly</span>
              {isYearly && (
                <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                  Save up to 20%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Pricing Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8">
          {pricingPlans.map((plan, index) => (
            <PricingCard 
              key={plan.name} 
              plan={plan} 
              isYearly={isYearly}
              isPopular={plan.popular}
            />
          ))}
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center text-gray-900">Frequently asked questions</h2>
          <p className="mt-4 text-center text-gray-500">Have a different question? Contact us at support@vault.com</p>
          
          <div className="mt-12 space-y-6">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-indigo-700">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mt-4 text-xl text-indigo-100">
            Join thousands of businesses using Vault to manage their documents efficiently.
          </p>
          <div className="mt-8">
            <Link
              to="/signup"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
            >
              Start your free trial
            </Link>
            <Link
              to="/contact"
              className="ml-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-800 bg-opacity-0 hover:bg-opacity-20"
            >
              Contact sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;