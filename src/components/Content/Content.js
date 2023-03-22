
import ItemContent from "./ItemContent";


function Content({ data = [] }) {
    return (
        <div>
            {data.map(account => (
                <ItemContent key={account.id} data={account} />
            ))}
        </div>
    )
}

export default Content;