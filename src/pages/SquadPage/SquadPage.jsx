import { checkToken } from '../../utilities/users-service';

export default function SquadPage() {
  
  async function handleCheckToken() {
    const expDate = await checkToken();
    console.log(expDate);
  }
  
  return (
    <>
      <h1>Squads</h1>
      <button onClick={handleCheckToken}>Check When My Login Expires</button>
    </>
  );
}