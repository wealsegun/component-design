import { Header } from "./header"
import { Layout } from "./layout"
import { Speakers } from "./speakers"

export const App = () => {
    return (

        <div>
            <Layout startingTheme="light">
                <div>
                    <Header />
                    <Speakers />
                </div>
            </Layout>
        </div>
    )
}