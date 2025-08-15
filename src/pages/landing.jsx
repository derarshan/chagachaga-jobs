import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import companies from "@/data/companies";
import faqs from "@/data/faq";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// 🔹 Clerk imports
import { SignInButton, useAuth } from "@clerk/clerk-react";

const LandingPage = () => {
  const { isSignedIn } = useAuth();

  return (
    <main className="flex flex-col gap-10 sm:gap-10 py-10 sm:py-0">
      <section className="text-center">
        <div
          className="flex flex-row justify-center gradient-title 
          text-4xl font-extrabold sm:text-6xl lg:text-9xl tracking-tighter py-4"
        >
          Find Your Dream
          <div>
          Opportunity
        </div>
        </div>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          Explore thousands of job listings or find the perfect candidate!
        </p>
      </section>

      <div className="flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl px-4">

          {/*find jobs button */}
          {isSignedIn ? (
            <Link to="/jobs" className="w-full">
              <Button variant="blue" className="w-full text-2xl py-16">
                Find Jobs
              </Button>
            </Link>
          ) : (
            <SignInButton mode="modal">
              <Button variant="blue" className="w-full text-2xl py-16">
                Find Jobs
              </Button>
            </SignInButton>
          )}

          {/*post jobs button */}
          {isSignedIn ? (
            <Link to="/post-job" className="w-full">
              <Button size="xl" variant="destructive" className="w-full text-2xl py-16">
                Post Jobs
              </Button>
            </Link>
          ) : (
            <SignInButton mode="modal">
              <Button size="xl" variant="destructive" className="w-full text-2xl py-16">
                Post Jobs
              </Button>
            </SignInButton>
          )}

        </div>
      </div>

      {/*carousel*/}
      <Carousel
        plugins={[Autoplay({ delay: 2000, stopOnInteraction: true })]}
        className="w-full py-10"
      >
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => (
            <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 ">
              <img
                src={path}
                alt={name}
                className="h-9 sm:h-14 object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/*banner*/}
      <img src="/banner.png" alt="Banner" />

      {/*cards*/}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            Search and apply for jobs, create your profile, and get hired!
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            Post jobs, manage applications, and find the right talent for your team.
          </CardContent>
        </Card>
      </section>

      {/*accordion*/}
      <Accordion type="single" collapsible>
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
};

export default LandingPage;
