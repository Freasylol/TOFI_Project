const ObjectItem = (({message, object}) => {

    return (
        <div>
            {Object.keys(object).map(key => {
                return <div key={key}>
                    <pre>{key}: {object[key]}</pre>
                </div>
            })}
        </div>
    )
})

export default ObjectItem;
