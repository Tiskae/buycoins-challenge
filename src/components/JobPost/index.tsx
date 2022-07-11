import "./styles.scss";

interface Props {
  id: string;
  title: string;
  applyUrl: string;
  commitment: string;
  location: string;
  createdAt: string;
  companyName: string;
  companyWebsite: string;
  tags: string[];
  isFeatured: boolean;
  isRemote: boolean;
}

const JobPost = (props: Props) => {
  return (
    <div className="job-post">
      <a
        href={props.companyWebsite}
        target="_blank"
        className="job-post__company"
      >
        {props.companyName}
      </a>
      <div className="job-post__content">
        <div className="job-post__headings">
          <h3 className="job-post__title">{props.title}</h3>
          {props.isFeatured && (
            <h4>
              <span> Featured</span>
            </h4>
          )}
          <h4>{props.isRemote ? <span> Remote</span> : props.location}</h4>
        </div>
        <div className="job-post__row">
          <p>{props.commitment}</p>
          <p>Posted: {props.createdAt}</p>
        </div>
        <div className="job-post__tags">
          {props.tags.map((tag, idx) => (
            <p key={idx} className="job-post__tag">
              {tag}
            </p>
          ))}
        </div>
        <a href={props.applyUrl} target="_blank" className="btn btn--primary">
          Apply
        </a>
      </div>
    </div>
  );
};
export default JobPost;
