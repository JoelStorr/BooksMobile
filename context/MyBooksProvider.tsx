import { createContext} from "react";


const MyBooksContext = createContext({});

const MyBooksProvider = ({children}) =>{
    return(
        <MyBooksContext.Provider value={{test: 'a'}} >
            {children}
        </MyBooksContext.Provider>
    )
}

export default  MyBooksProvider;
