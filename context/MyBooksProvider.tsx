import {createContext, useContext, ReactNode, useState} from "react";


 const MyBooksContext = createContext({});

 type Props = {
     children: ReactNode,
}

const MyBooksProvider = ({ children }: Props) =>{

     const [savedBooks, setSavedBooks] = useState<Book[]>([]);


     const areBooksTheSame = (a:Book, b:Book ) =>{
         return JSON.stringify(a) === JSON.stringify(b)
     }

     const isBookSaved = (book: Book)=>{
         //.some looks for at least one match
         return savedBooks.some(
             (savedBook)=> areBooksTheSame(savedBook, book)
         );
     }
     const onToggleSave = (book: Book) =>{

        if(isBookSaved(book)){
            //remove
            setSavedBooks(
                (books) => books.filter(
                    (savedBook)=> JSON.stringify(savedBook) !== JSON.stringify(book)
                )
            );
        }else{
            //add to save
            setSavedBooks((books)=> [book, ...books]);
        }


     }

    return(
        <MyBooksContext.Provider value={{onToggleSave}} >
            {children}
        </MyBooksContext.Provider>
    )
}


export const useMyBooks = ()=> useContext(MyBooksContext);

export default  MyBooksProvider;
