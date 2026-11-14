import { Link } from 'react-router-dom'

export default function Information({ title, informations }) {
  return (
    <div className="footer-information">
      <h2>{title}</h2>

      <ul>
        {informations.map((information) => (
          <li key={information.text}>
            <Link to={information.link}>
              {information.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}