import PageHeader from "../PageHeader"
import SearchPageResultSec from "./SearchPageResultSection"

function SearchPage() {
    return (<>
            <main className="container-fluid">
            <PageHeader ColorHeaderProp="bg-danger"/>
            <SearchPageResultSec/>  
            </main>
        </>
    )
}

export default SearchPage