import { getJobs } from '@/api/apiJobs'
import useFetch from '@/hooks/use-fetch';
import { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';
import { useUser } from "@clerk/clerk-react"
import JobCard from '@/components/job-card';
import { getCompanies } from '@/api/apiCompanies';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { State } from 'country-state-city';

const JobListing = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [location, setLocation] = useState("");
    const [company_id, setCompany_id] = useState("");
    const { isLoaded } = useUser();

  const { fn: fnJobs, data: jobs, loading: loadingJobs } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery
  });
  
  const { fn: fnCompanies, data: companies} = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    
    const query = formData.get("search-query");
    if(query) setSearchQuery(query);
  }

  const clearFilters = () => {
    setSearchQuery("");
    setLocation("");  
    setCompany_id("");
  }

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="red" />
  }

  return (
    <div>
      <h1 className='gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8'>Latest Jobs</h1>

      <form onSubmit={handleSearch} className='h-14 flex w-full gap-2 items-center mb-3'>
        <Input 
        type="text" 
        placeholder="Search Jobs By Title..."
        name="search-query"
        className="h-full flex-1 px-4 text-md" />

        <Button 
        type="submit"
        className="h-full sm:w-28"
        variant="blue">Search</Button>
      </form>

      <div className='flex flex-col sm:flex-row gap-2'>
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter By Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("DE").map(({name}) => {

                return (<SelectItem key={name} value={name}>{name}</SelectItem>);
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={company_id} onValueChange={(value) => setCompany_id(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter By Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies?.map(({name, id}) => {
                
                return (<SelectItem key={id} value={id}>{name}</SelectItem>);
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button variant="destructive" className="sm:w-1/2" onClick={clearFilters}>🧹Clear Filter</Button>
      </div>

      {loadingJobs && (<BarLoader className="mt-4" width={"100%"} color="blue" />)}

      {loadingJobs === false && (
        <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {jobs?.length ? (
              jobs.map((job) => {
                return (<JobCard key={job.id} job={job} savedInit={job?.saved?.length > 0}/>);
                })) : (<div>
              No Jobs Found... But keep the Engine chugging, you'll find a way.
            </div>)}
        </div>
      )}
    </div>
  );
}

export default JobListing;