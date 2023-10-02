function SearchPageHeader() {
    return (<>
            <header className="row">
            <div className="col-12 bg-danger">
                <div className="container-lg d-flex justify-content-between align-items-center py-2">
                    <p className="logoClass m-0 text-danger h2">e!</p>
                    <div>
                        <button className="btn text-white">Login</button>
                        <button className="btn btn-outline-light">Create an account</button>
                    </div>
                </div>
            </div>
        </header>
        </>
    )
}

export default SearchPageHeader