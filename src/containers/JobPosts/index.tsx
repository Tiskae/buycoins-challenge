import React, { useEffect, useState } from "react";
import axios from "axios";
import JobPost from "../../components/JobPost";
import "./styles.scss";

interface Props {
  featuredOnly: boolean;
  remoteOnly: boolean;
  searchText: string;
}

interface Job {
  id: string;
  title: string;
  applyUrl: string;
  commitment: string;
  isFeatured: boolean;
  isRemote: boolean;
  location: string;
  createdAt: Date;
  companyName: string;
  companyWebsite: string;
  tags: string[];
}
const JobPosts = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [retry, setRetry] = useState(0); // The value doesn't matter, just to signal a change to fetch again

  const JOBS_QUERY = `
    {
      jobs {
      id
      title
      applyUrl
      commitment {
        slug
      }
      locationNames
      remotes {
        type
      }
      isFeatured
    createdAt
    company {
      name
      websiteUrl
    }
    tags {
      name
    }
  }
}`;

  useEffect(() => {
    axios({
      url: "https://api.graphql.jobs/",
      method: "post",
      data: {
        query: JOBS_QUERY,
      },
    })
      .then((response) => {
        setLoading(false);
        const modJobs = response.data.data.jobs
          .map(
            (job: any): Job => ({
              id: job.id,
              title: job.title,
              isFeatured: job.isFeatured,
              isRemote: job.remotes.length !== 0,
              applyUrl: job.applyUrl,
              commitment: job.commitment.slug,
              location: job.locationNames,
              createdAt: new Date(job.createdAt),
              companyName: job.company.name,
              companyWebsite: job.company.websiteUrl,
              tags: job.tags.map((tag: { name: string }) => tag.name),
            })
          )
          .sort((a: Job, b: Job) => (b.createdAt > a.createdAt ? 1 : -1));
        setJobs(modJobs);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [retry]);

  if (jobs === null && !loading) {
    return (
      <div className="job-posts job-posts__info">
        <p>Failed to fetch</p>
        {/* Again old + 1 just signals a fetch retry, value doesn't matter */}
        <button
          className="btn btn--primary"
          onClick={() => setRetry((old) => old + 1)}
        >
          Retry
        </button>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="job-posts job-posts__info">
        <p>Loading...</p>
      </div>
    );
  }

  let filteredJobs = [...jobs!];
  if (props.searchText !== "") {
    filteredJobs = filteredJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(props.searchText) ||
        job.companyName?.toLowerCase().includes(props.searchText) ||
        job.location?.toLowerCase().includes(props.searchText) ||
        job.tags.join(" ").toLowerCase().includes(props.searchText)
    );
  }

  if (props.featuredOnly) {
    filteredJobs = filteredJobs.filter((job) => job.isFeatured === true);
  }
  if (props.remoteOnly) {
    filteredJobs = filteredJobs.filter((job) => job.isRemote === true);
  }

  if (filteredJobs.length === 0) {
    return (
      <div className="job-posts">
        <p>No jobs found</p>
      </div>
    );
  }

  return (
    <div className="job-posts">
      {filteredJobs.map((job) => (
        <JobPost
          key={job.id}
          id={job.id}
          title={job.title}
          applyUrl={job.applyUrl}
          commitment={job.commitment}
          location={job.location}
          createdAt={job.createdAt.toDateString()}
          companyName={job.companyName}
          companyWebsite={job.companyWebsite}
          tags={job.tags}
          isFeatured={job.isFeatured}
          isRemote={job.isRemote}
        />
      ))}
    </div>
  );
};
export default JobPosts;
