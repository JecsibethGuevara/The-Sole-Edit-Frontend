import { Shield, Store, TrendingUp, Users } from "lucide-react";
import React from "react";
import { Header } from "../shared/Header";
import Image from "next/image";
import { Card } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { Footer } from "../shared/Footer";

const About = () => {
  const team = [
    {
      name: "John Anderson",
      role: "Founder & CEO",
      image: "/professional-man-headshot.png",
    },
    {
      name: "Sarah Chen",
      role: "COO",
      image: "/professional-woman-headshot.png",
    },
    {
      name: "Mike Johnson",
      role: "CTO",
      image: "/professional-headshot-man-tech.jpg",
    },
    {
      name: "Emma Davis",
      role: "Head of Partnerships",
      image: "/professional-woman-headshot.png",
    },
  ];

  const values = [
    {
      icon: Store,
      title: "Seller Empowerment",
      description:
        "We provide tools and support to help small businesses and entrepreneurs reach millions of customers worldwide.",
    },
    {
      icon: Users,
      title: "Customer Focus",
      description:
        "Every decision we make is driven by our commitment to delivering exceptional value to our customers.",
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description:
        "We continuously evolve our platform with cutting-edge technology to improve the shopping experience.",
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description:
        "We maintain the highest standards of security and integrity to protect both buyers and sellers.",
    },
  ];

  return (
    <main className="w-full bg-background text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            About StoreMall
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Connecting millions of customers with trusted sellers worldwide.
            Revolutionizing the way people shop online.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground mb-4 text-lg leading-relaxed">
                To create the worlds most customer-centric marketplace where any
                seller can reach global customers and every buyer can find
                exactly what they need with confidence.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We believe in building a community where trust, innovation, and
                customer satisfaction drive everything we do.
              </p>
            </div>
            <Image
              src="/modern-office-workspace-team-collaboration.jpg"
              alt="Our Mission"
              className="rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold mb-12 text-center">
            Our Core Values
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <Card key={i} className="p-6">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">{value.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold mb-12">Our Story</h3>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              Founded in 2020, StoreMall began with a simple idea: What if we
              could make it effortless for small businesses to reach millions of
              customers? Our founders recognized the gap in the market for a
              truly seller-friendly marketplace that didnt compromise on
              customer experience.
            </p>
            <p>
              Today, weve grown to host over 500 active stores with millions of
              products, serving 2 million+ happy customers worldwide. But our
              journey is just beginning. Were committed to expanding
              opportunities for sellers and continuously improving our platform
              to provide the best shopping experience possible.
            </p>
            <p>
              Every day, our diverse team works tirelessly to ensure that
              StoreMall remains the most trusted and innovative marketplace for
              both buyers and sellers. Were proud of what weve built, and even
              more excited about whats to come.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold mb-12 text-center">
            Our Leadership Team
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <Card key={i} className="overflow-hidden text-center">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-semibold">{member.name}</h4>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Us Today</h2>
          <p className="text-lg opacity-90 mb-8">
            Whether youre a buyer or seller, become part of the StoreMall
            community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={"/home/#stores"}>
              <Button
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full"
              >
                Browse Stores
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
