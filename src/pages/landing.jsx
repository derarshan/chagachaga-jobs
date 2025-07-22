import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Link } from "react-router-dom";
import companies from "@/data/companies";
import faqs from "@/data/faq";
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const LandingPage = () => {
  return (
    <main className="flex flex-col gap-10 sm:gap-10 py-10 sm:py-20">
      <section className="text-center">
        <h1 className="flex flex-row items-center justify-center gradient-title 
          text-4xl font-extrabold sm:text-6xl lg:text-9xl tracking-tighter py-4">
          Find Your Dream <img src="/logo.png" alt="Logo" className="h-32 sm:h-48 lg:h-64" />
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          Explore thousands of job listings or find the perfect candidate!
        </p>
      </section>

      <div className="flex gap-6 justify-center">
        <Link to="/jobs">
        <Button variant="blue" size="xl">Find Jobs</Button>
        </Link>

        <Link to="/post-job">
        <Button size="xl" variant='destructive'>Post Jobs</Button>
        </Link>
      </div>

      {/*carousel*/}
      <Carousel plugins={[Autoplay({ delay: 2000, stopOnInteraction: true})]} className="w-full py-10">
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
            {companies.map(({name, id, path}) => {
              return(
              <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 ">
                <img src={path} alt={name} 
                className="h-9 sm:h-14 object-contain"/>
              </CarouselItem>
            );
          })}
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
            {faqs.map((faq, index) => {
              
              return(
                <AccordionItem key={index} value={`item-${index + 1}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
    </main>
  );
}

export default LandingPage;