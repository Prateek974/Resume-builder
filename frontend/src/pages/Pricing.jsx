import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Pricing = () => {
    const { user } = useAuth();

    const tiers = [
        {
            name: "Free",
            price: "₹0",
            description: "Perfect for students starting their first internship.",
            features: ["1 Resume Template", "Basic AI Polish (3/mo)", "Export to PDF", "ATS Keyword Scan"],
            buttonText: user ? "Current Plan" : "Get Started",
            highlight: false
        },
        {
            name: "Pro",
            price: "₹499",
            period: "/mo",
            description: "For active job seekers targeting top-tier companies.",
            features: ["Unlimited Templates", "Unlimited AI Polish", "Cover Letter Builder", "Advanced ATS Analytics", "Custom Brand Colors"],
            buttonText: "Go Pro",
            highlight: true
        },
        {
            name: "Elite",
            price: "₹999",
            period: "/mo",
            description: "High-end data insights for senior roles.",
            features: ["Everything in Pro", "1-on-1 AI Interview Prep", "LinkedIn Profile Optimizer", "Priority Support", "Ghost Mode (Hidden from recruiters)"],
            buttonText: "Go Elite",
            highlight: false
        }
    ];

    return (
        <div className="min-h-screen bg-white font-sans">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto pt-20 pb-12 px-4 text-center">
                <h2 className="text-[#009245] font-bold tracking-widest text-sm uppercase mb-3">Pricing</h2>
                <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight mb-4">
                    Invest in your <span className="text-[#009245]">Career.</span>
                </h1>
                <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
                    Choose the plan that fits your career goals. Whether you're a student or a senior engineer, we have the tools to get you hired.
                </p>
            </div>

            {/* Pricing Cards */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 pb-20">
                {tiers.map((tier, index) => (
                    <div 
                        key={index}
                        className={`relative p-8 rounded-2xl border ${
                            tier.highlight 
                            ? 'border-[#009245] shadow-2xl scale-105 z-10 bg-white' 
                            : 'border-zinc-200 bg-white'
                        } flex flex-col transition-all duration-300 hover:shadow-lg`}
                    >
                        {tier.highlight && (
                            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#009245] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                                Most Popular
                            </span>
                        )}

                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-zinc-900 mb-2">{tier.name}</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-black text-zinc-900">{tier.price}</span>
                                <span className="text-zinc-500 font-medium">{tier.period}</span>
                            </div>
                            <p className="text-zinc-500 text-sm mt-4 leading-relaxed">
                                {tier.description}
                            </p>
                        </div>

                        <div className="space-y-4 mb-10 flex-grow">
                            {tier.features.map((feature, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-[#009245] text-[20px]">
                                        check_circle
                                    </span>
                                    <span className="text-sm text-zinc-600 font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <Link 
                            to={user ? "/checkout" : "/login"}
                            className={`w-full py-3 rounded-lg font-bold text-center transition-all ${
                                tier.highlight
                                ? 'bg-[#009245] text-white hover:bg-[#006837] shadow-md'
                                : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'
                            }`}
                        >
                            {tier.buttonText}
                        </Link>
                    </div>
                ))}
            </div>

            {/* Trust Footer */}
            <div className="max-w-7xl mx-auto px-4 text-center border-t border-zinc-100 pt-10 pb-20">
                <p className="text-zinc-400 text-sm font-medium mb-4 italic">
                    Trusted by developers at:
                </p>
                <div className="flex flex-wrap justify-center gap-8 opacity-40 grayscale">
                    <span className="font-black text-xl text-zinc-900">GOOGLE</span>
                    <span className="font-black text-xl text-zinc-900">META</span>
                    <span className="font-black text-xl text-zinc-900">ZOMATO</span>
                    <span className="font-black text-xl text-zinc-900">TCS</span>
                </div>
            </div>
        </div>
    );
};

export default Pricing;