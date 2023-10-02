import QuickSearchPage from "./quickSearchPage"
import WalpaperPage from "./walpaperPage"


function HomePage() {
    return (<>
            {/* <p>home page line</p> */}
            <main className="container-fluid ">
                <WalpaperPage />
                <QuickSearchPage />
            </main>
        </>
    )
}

export default HomePage