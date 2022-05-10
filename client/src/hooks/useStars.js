import { faStar } from "@fortawesome/free-solid-svg-icons"
import { faStar as starReg } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const useStars = (rate) => {
    const stars = Math.floor(rate)
    const starsPrimary = [...Array(stars)].map((e, index) => {
        return <FontAwesomeIcon key={index} icon={faStar} />
    })

    const starsSeccondary = [Array(5 - stars)].map((e, index) => {
        return <FontAwesomeIcon key={index.toString() + 'b'} icon={starReg} />
    })

    return {
        starsPrimary,
        starsSeccondary
    }
}

export default useStars;
