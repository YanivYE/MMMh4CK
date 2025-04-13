type Props = {
    username: string;
    score: number;
  };
  
  export default function ProfileCard({ username, score }: Props) {
    return (
      <div className="profile-card top-right">
        <img
          src={`https://ui-avatars.com/api/?name=${username}&background=random`}
          alt="avatar"
          className="profile-avatar"
        />
        <div className="profile-info">
          <h2>{username}</h2>
          <p>Score: {score}</p>
        </div>
      </div>
    );
  }
  