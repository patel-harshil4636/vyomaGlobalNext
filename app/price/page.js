'use client';
import { useState, useCallback } from "react";

const socialPlans = [
  {
    id: "starter",
    name: "Starter Growth",
    price: 7499,
    original: 9999,
    tag: null,
    desc: "Perfect launchpad for businesses beginning their digital journey.",
    videos: 6, posts: 4,
    features: ["6 Professional Videos", "4 Creative Static Posts", "Festival Posters", "Uploading & Scheduling", "Basic Content Strategy", "WhatsApp Support"],
    best: ["Small businesses", "Home-made product sellers", "Local shops", "New startups"],
    color: "#6B7280",
    support: "Basic monthly support",
  },
  {
    id: "business",
    name: "Business Growth",
    price: 12000,
    original: 16999,
    tag: "Most Popular",
    desc: "Stronger consistency and regular visibility for growing brands.",
    videos: 10, posts: 10,
    features: ["10 Professional Videos", "10 Creative Posts", "Festival Posters", "Uploading & Scheduling", "Better Content Planning", "Growth Strategy Support"],
    best: ["Growing brands", "Clinics", "Clothing stores", "Service businesses"],
    color: "#3B82F6",
    support: "Priority content planning support",
  },
  {
    id: "premium",
    name: "Premium Authority",
    price: 15999,
    original: 21999,
    tag: null,
    desc: "For businesses building authority and premium brand presence.",
    videos: 15, posts: 10,
    features: ["15 Premium Videos", "10 Premium Creative Posts", "Festival Posters", "Uploading & Scheduling", "Brand Positioning Strategy", "Stronger Content Execution"],
    best: ["Premium service providers", "Professional brands", "Architects", "Consultants"],
    color: "#8B5CF6",
    support: "Premium strategy support",
  },
  {
    id: "elite",
    name: "Elite High-Profile",
    price: 24999,
    original: 27999,
    tag: "Premium",
    desc: "Where visual authority directly drives high-value conversions.",
    videos: 15, posts: null,
    features: ["15 High-Demand Premium Videos", "Enhanced Premium Posts", "Premium Festival Posters", "AI Video Creation", "Uploading & Scheduling", "Advanced Strategy Planning"],
    best: ["Real Estate", "Builders", "Luxury clinics", "Premium brands"],
    color: "#F59E0B",
    support: "High-priority support",
  },
];

const websitePlans = [
  {
    id: "event",
    name: "Digital Event Card",
    price: 2499,
    tag: "Entry",
    desc: "Fast, elegant digital invitations for events and celebrations.",
    features: ["Marriage / Event Invitation", "Celebration Card", "Mobile-Friendly Design", "Shareable Digital Format"],
    best: ["Weddings", "Functions", "Event promotions"],
    color: "#6B7280",
    note: null,
  },
  {
    id: "starter-web",
    name: "Starter Portfolio",
    price: 8999,
    tag: null,
    desc: "Build trust and professionalism for your online presence.",
    features: ["Business Showcase Website", "Product / Service Presentation", "Google Map Integration", "WhatsApp Integration", "Contact Form", "1-Year Domain Included*"],
    best: ["Instagram sellers", "Local service providers", "New businesses"],
    color: "#6B7280",
    note: null,
  },
  {
    id: "luxury",
    name: "Luxury Portfolio",
    price: 12999,
    tag: "Popular",
    desc: "Premium UI/UX that creates trust and elevates brand perception.",
    features: ["Everything in Starter Portfolio", "Premium UI/UX", "Luxury Business Presentation", "Home, About & Contact Pages", "Better Visual Experience", "1-Year Domain Included*"],
    best: ["Real estate consultants", "Architects", "High-profile businesses"],
    color: "#8B5CF6",
    note: null,
  },
  {
    id: "structured",
    name: "Structured Business",
    price: 19999,
    tag: null,
    desc: "Structured selling without full eCommerce complexity.",
    features: ["Professional Business Website", "Up to 30 Product Showcase", "WhatsApp Product Redirect", "Contact Form", "Professional Layout", "1-Year Domain Included*"],
    best: ["Fashion stores", "Furniture sellers", "Electronics sellers"],
    color: "#3B82F6",
    note: "No cart, login, or admin panel",
  },
  {
    id: "basic-ecom",
    name: "Basic eCommerce",
    price: 35000,
    tag: null,
    desc: "Strong middle step before full eCommerce scaling.",
    features: ["Up to 30 Products", "Basic Cart Functionality", "User Sign In / Login", "Cart Saved Per User", "WhatsApp Checkout Redirect", "Server Side Included"],
    best: ["Businesses ready for online selling"],
    color: "#10B981",
    note: "No payment gateway or admin panel",
  },
  {
    id: "full-ecom",
    name: "Complete eCommerce",
    price: 85699,
    tag: "Best Value",
    desc: "Built for serious business growth and scalable operations.",
    features: ["Full eCommerce Functionality", "Up to 100 Products", "Add to Cart + Order Management", "Payment Gateway Integration", "Admin Panel", "Order History", "Google Map Integration"],
    best: ["Serious brands", "Growing online stores"],
    color: "#F59E0B",
    note: null,
  },
  {
    id: "enterprise",
    name: "Premium Enterprise",
    price: 119999,
    tag: "Enterprise",
    desc: "Where presentation and trust directly impact high-value sales.",
    features: ["Everything in Complete eCommerce", "Premium Luxury UI/UX", "High-End Brand Positioning", "Premium Conversion Flow", "Faster Performance Optimization", "Enterprise-Level Design Quality"],
    best: ["Premium brands", "Large businesses", "Enterprise clients"],
    color: "#EF4444",
    note: null,
  },
];

const customOptions = [
  { id: "pg", label: "Payment Gateway", price: 8000, icon: "💳" },
  { id: "crm", label: "CRM Integration", price: 12000, icon: "🔗" },
  { id: "booking", label: "Booking System", price: 10000, icon: "📅" },
  { id: "ui", label: "Premium UI Design", price: 15000, icon: "🎨" },
  { id: "wa", label: "WhatsApp Automation", price: 6000, icon: "💬" },
  { id: "seo", label: "SEO Optimization", price: 8000, icon: "📈" },
  { id: "lead", label: "Lead Generation Setup", price: 9000, icon: "🎯" },
  { id: "ai", label: "AI Video Creation", price: 18000, icon: "🤖" },
  { id: "brand", label: "Branding Solutions", price: 14000, icon: "✦" },
  { id: "social", label: "Social Media Add-ons", price: 5000, icon: "📱" },
];

function fmt(n) {
  return "₹" + n.toLocaleString("en-IN");
}

function Badge({ text, color }) {
  const map = {
    "Most Popular": { bg: "#1D4ED8", text: "#EFF6FF" },
    "Premium": { bg: "#92400E", text: "#FFFBEB" },
    "Best Value": { bg: "#065F46", text: "#ECFDF5" },
    "Enterprise": { bg: "#7C3AED", text: "#F5F3FF" },
    "Popular": { bg: "#7C3AED", text: "#F5F3FF" },
    "Entry": { bg: "#374151", text: "#F9FAFB" },
  };
  const s = map[text] || { bg: "#374151", text: "#F9FAFB" };
  return (
    <span style={{
      background: s.bg, color: s.text,
      fontSize: 11, fontWeight: 600, letterSpacing: "0.06em",
      padding: "3px 10px", borderRadius: 4, textTransform: "uppercase",
      fontFamily: "'DM Sans', sans-serif",
    }}>{text}</span>
  );
}

function PlanCard({ plan, selected, onSelect, isWebsite }) {
  const isSelected = selected === plan.id;
  const savings = plan.original ? plan.original - plan.price : null;

  return (
    <div
      onClick={() => onSelect(plan.id === selected ? null : plan.id)}
      style={{
        background: isSelected
          ? "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)"
          : "#0F172A",
        border: isSelected ? `2px solid ${plan.color}` : "1.5px solid #1E293B",
        borderRadius: 16,
        padding: "28px 24px",
        cursor: "pointer",
        transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
        position: "relative",
        transform: isSelected ? "translateY(-4px)" : "none",
        boxShadow: isSelected ? `0 20px 60px ${plan.color}25, 0 4px 16px rgba(0,0,0,0.4)` : "0 2px 8px rgba(0,0,0,0.3)",
      }}
    >
      {plan.tag && (
        <div style={{ position: "absolute", top: -12, left: 20 }}>
          <Badge text={plan.tag} />
        </div>
      )}

      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
          <div>
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: plan.color, display: "inline-block",
              marginRight: 8, marginBottom: 2, verticalAlign: "middle",
            }} />
            <span style={{ color: "#94A3B8", fontSize: 12, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>
              {isWebsite ? "Website" : "Social Media"}
            </span>
          </div>
          <div style={{
            width: 24, height: 24, borderRadius: "50%",
            border: isSelected ? `2px solid ${plan.color}` : "1.5px solid #334155",
            background: isSelected ? plan.color : "transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, transition: "all 0.2s",
          }}>
            {isSelected && <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>✓</span>}
          </div>
        </div>

        <h3 style={{ color: "#F1F5F9", fontSize: 20, fontWeight: 700, margin: "10px 0 4px", fontFamily: "'Sora', sans-serif" }}>
          {plan.name}
        </h3>
        <p style={{ color: "#64748B", fontSize: 13, margin: 0, lineHeight: 1.5, fontFamily: "'DM Sans', sans-serif" }}>
          {plan.desc}
        </p>
      </div>

      <div style={{ marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid #1E293B" }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
          <span style={{ color: "#F8FAFC", fontSize: 30, fontWeight: 800, fontFamily: "'Sora', sans-serif", letterSpacing: "-0.02em" }}>
            {fmt(plan.price)}
          </span>
          {!isWebsite && <span style={{ color: "#475569", fontSize: 13, marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>/month</span>}
          {isWebsite && <span style={{ color: "#475569", fontSize: 13, marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>onwards</span>}
        </div>
        {savings && (
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 4 }}>
            <span style={{ color: "#475569", fontSize: 13, textDecoration: "line-through", fontFamily: "'DM Sans', sans-serif" }}>{fmt(plan.original)}</span>
            <span style={{ color: "#10B981", fontSize: 12, fontWeight: 600, background: "#052E16", padding: "2px 8px", borderRadius: 4, fontFamily: "'DM Sans', sans-serif" }}>
              Save {fmt(savings)}
            </span>
          </div>
        )}
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", display: "flex", flexDirection: "column", gap: 8 }}>
        {plan.features.map(f => (
          <li key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ color: plan.color, fontSize: 14, marginTop: 1, flexShrink: 0 }}>◆</span>
            <span style={{ color: "#CBD5E1", fontSize: 13, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.4 }}>{f}</span>
          </li>
        ))}
      </ul>

      {plan.note && (
        <div style={{ background: "#1E293B", borderRadius: 8, padding: "8px 12px", marginBottom: 16 }}>
          <span style={{ color: "#64748B", fontSize: 11, fontFamily: "'DM Sans', sans-serif" }}>⚠ {plan.note}</span>
        </div>
      )}

      <div style={{ borderTop: "1px solid #1E293B", paddingTop: 16 }}>
        <p style={{ color: "#475569", fontSize: 12, margin: "0 0 8px", fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: "0.06em" }}>Best for</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {plan.best.map(b => (
            <span key={b} style={{
              background: "#1E293B", color: "#94A3B8", fontSize: 11,
              padding: "4px 10px", borderRadius: 6, fontFamily: "'DM Sans', sans-serif",
              border: "1px solid #334155",
            }}>{b}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function VyomaPricing() {
  const [tab, setTab] = useState("social");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [customized, setCustomized] = useState({});

  const toggleCustom = (id) => {
    setCustomized(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const customTotal = customOptions.filter(o => customized[o.id]).reduce((s, o) => s + o.price, 0);

  const plans = tab === "social" ? socialPlans : websitePlans;
  const currentPlan = plans.find(p => p.id === selectedPlan);

  const totalInvestment = (currentPlan?.price || 0) + customTotal;

  // Build WhatsApp message with selected package details
  const handleWhatsAppClick = useCallback(() => {
    if (!currentPlan) {
      alert('Please select a package before reaching out on WhatsApp.');
      return;
    }

    const selectedAddons = customOptions.filter(o => customized[o.id]);
    const addonsText = selectedAddons.length > 0
      ? selectedAddons.map(o => `${o.label} (${fmt(o.price)})`).join(', ')
      : 'None';

    const packageType = tab === 'social' ? 'Social Media Management' : 'Website Development';
    const priceSuffix = tab === 'social' ? ' / month' : ' (one-time)';
    
    const message = `Hello Vyoma Global,

I'm interested in the following package:

*Package:* ${currentPlan.name} (${packageType})
*Price:* ${fmt(currentPlan.price)}${priceSuffix}
*Selected Add-ons:* ${addonsText}
*Total Investment:* ${fmt(totalInvestment)}${tab === 'social' ? ' / month' : ' (one-time)'}

Please provide more details or a consultation. Thank you.`;

    const whatsappUrl = `https://wa.me/918200953641?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }, [currentPlan, customized, tab, totalInvestment]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#020617",
      fontFamily: "'DM Sans', sans-serif",
      color: "#F1F5F9",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />

      {/* Hero Section */}
      <div style={{
        background: "linear-gradient(180deg, #0F172A 0%, #020617 100%)",
        borderBottom: "1px solid #1E293B",
        padding: "64px 24px 48px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: 600, height: 300,
          background: "radial-gradient(ellipse at center top, #1D4ED820 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "#0F172A", border: "1px solid #334155",
          borderRadius: 100, padding: "6px 16px", marginBottom: 24,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#3B82F6", display: "inline-block" }} />
          <span style={{ fontSize: 12, color: "#94A3B8", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>
            Vyoma Global — Digital Growth Solutions
          </span>
        </div>

        <h1 style={{
          fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800,
          fontFamily: "'Sora', sans-serif", letterSpacing: "-0.03em",
          margin: "0 0 16px", lineHeight: 1.1,
          background: "linear-gradient(135deg, #F8FAFC 30%, #94A3B8 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          Build Trust. Generate Leads.<br />Scale Revenue.
        </h1>

        <p style={{ color: "#64748B", fontSize: 17, maxWidth: 540, margin: "0 auto 32px", lineHeight: 1.6 }}>
          Select a package that aligns with your growth objectives, then customize your solution with precision add-ons.
        </p>

        {/* Tab Switcher */}
        <div style={{
          display: "inline-flex",
          background: "#0F172A",
          border: "1px solid #1E293B",
          borderRadius: 12, padding: 4, gap: 4,
        }}>
          {[
            { key: "social", label: "Social Media Management" },
            { key: "website", label: "Website Development" },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => { setTab(t.key); setSelectedPlan(null); setCustomized({}); }}
              style={{
                background: tab === t.key ? "#1E293B" : "transparent",
                border: tab === t.key ? "1px solid #334155" : "1px solid transparent",
                borderRadius: 9, padding: "10px 24px",
                color: tab === t.key ? "#F1F5F9" : "#64748B",
                fontSize: 14, fontWeight: 600, cursor: "pointer",
                transition: "all 0.2s", fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.01em",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Plans Grid */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: tab === "social"
            ? "repeat(auto-fit, minmax(280px, 1fr))"
            : "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 20,
          marginBottom: 64,
        }}>
          {plans.map(plan => (
            <PlanCard
              key={plan.id}
              plan={plan}
              selected={selectedPlan}
              onSelect={setSelectedPlan}
              isWebsite={tab === "website"}
            />
          ))}
        </div>

        {/* Customization Section */}
        <div style={{
          background: "#0F172A",
          border: "1px solid #1E293B",
          borderRadius: 20,
          padding: "40px 36px",
          marginBottom: 40,
        }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "linear-gradient(135deg, #1D4ED8, #7C3AED)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16,
              }}>⚡</div>
              <h2 style={{ color: "#F1F5F9", fontSize: 24, fontWeight: 700, margin: 0, fontFamily: "'Sora', sans-serif" }}>
                Customize Your Solution
              </h2>
            </div>
            <p style={{ color: "#64748B", fontSize: 14, margin: 0, paddingLeft: 48 }}>
              Enhance any package with precision add-ons tailored to your business requirements.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 12,
          }}>
            {customOptions.map(opt => {
              const active = customized[opt.id];
              return (
                <div
                  key={opt.id}
                  onClick={() => toggleCustom(opt.id)}
                  style={{
                    background: active ? "linear-gradient(135deg, #1E3A5F, #1A2744)" : "#131C2E",
                    border: active ? "1.5px solid #3B82F6" : "1.5px solid #1E293B",
                    borderRadius: 12, padding: "16px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    position: "relative",
                    transform: active ? "scale(1.02)" : "scale(1)",
                  }}
                >
                  {active && (
                    <div style={{
                      position: "absolute", top: 10, right: 10,
                      width: 18, height: 18, borderRadius: "50%",
                      background: "#3B82F6",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>✓</span>
                    </div>
                  )}
                  <div style={{ fontSize: 22, marginBottom: 8 }}>{opt.icon}</div>
                  <div style={{ color: active ? "#E0EFFE" : "#94A3B8", fontSize: 13, fontWeight: 600, marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>
                    {opt.label}
                  </div>
                  <div style={{ color: active ? "#60A5FA" : "#475569", fontSize: 14, fontWeight: 700, fontFamily: "'Sora', sans-serif" }}>
                    {fmt(opt.price)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Investment Summary */}
        <div style={{
          background: "linear-gradient(135deg, #0F172A 0%, #0D1B2A 100%)",
          border: "1px solid #1E3A5F",
          borderRadius: 20,
          padding: "36px",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 24,
          alignItems: "center",
        }}>
          <div>
            <p style={{ color: "#64748B", fontSize: 12, margin: "0 0 16px", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>
              Investment Summary
            </p>

            {currentPlan ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 420 }}>
                  <span style={{ color: "#94A3B8", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>
                    {currentPlan.name}
                    {tab === "social" && " (monthly)"}
                  </span>
                  <span style={{ color: "#F1F5F9", fontSize: 14, fontWeight: 600, fontFamily: "'Sora', sans-serif" }}>{fmt(currentPlan.price)}</span>
                </div>

                {customOptions.filter(o => customized[o.id]).map(o => (
                  <div key={o.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 420 }}>
                    <span style={{ color: "#94A3B8", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>{o.icon} {o.label}</span>
                    <span style={{ color: "#60A5FA", fontSize: 14, fontWeight: 600, fontFamily: "'Sora', sans-serif" }}>+{fmt(o.price)}</span>
                  </div>
                ))}

                <div style={{ height: 1, background: "#1E293B", maxWidth: 420, margin: "4px 0" }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 420 }}>
                  <span style={{ color: "#E2E8F0", fontSize: 16, fontWeight: 600, fontFamily: "'Sora', sans-serif" }}>Total Investment</span>
                  <span style={{
                    fontSize: 22, fontWeight: 800, fontFamily: "'Sora', sans-serif",
                    background: "linear-gradient(90deg, #60A5FA, #A78BFA)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  }}>{fmt(totalInvestment)}</span>
                </div>
              </div>
            ) : (
              <p style={{ color: "#475569", fontSize: 15, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>
                Select a package above to build your investment summary.
              </p>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end" }}>
            <button
              onClick={handleWhatsAppClick}
              style={{
                background: "linear-gradient(135deg, #1D4ED8, #7C3AED)",
                color: "#fff",
                padding: "14px 28px",
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 700,
                textDecoration: "none",
                fontFamily: "'DM Sans', sans-serif",
                whiteSpace: "nowrap",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                letterSpacing: "0.01em",
                border: "none",
                cursor: "pointer",
              }}
            >
              Get Started →
            </button>
            <span style={{ color: "#334155", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>No commitment required</span>
          </div>
        </div>

        {/* Bottom Trust Strip */}
        <div style={{
          display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap",
          padding: "40px 0 20px",
          borderTop: "1px solid #1E293B",
          marginTop: 48,
        }}>
          {[
            { icon: "🛡", label: "Transparent Pricing" },
            { icon: "⚡", label: "On-Time Delivery" },
            { icon: "💬", label: "WhatsApp Support" },
            { icon: "✦", label: "Premium Quality" },
          ].map(item => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <span style={{ color: "#64748B", fontSize: 13, fontWeight: 500, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.02em" }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}