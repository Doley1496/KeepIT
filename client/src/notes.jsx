/* For type="module" we have to export like this.
     module.exports = connectionUrl;
*/

/* server.js is a nodeJs file therefore instead of import we will use require method */

/* exporting the module router. */
// module.exports = router;

/* requiring and configuring the dotenv. */
require("dotenv").config();

/* For type="commonjs" we have to export like this.
     module.exports = connectionUrl;
*/

/* ******************************** 1: Create a new todo task  ******************************** */

/* Creating a route(api endpoint) ie. /create-task and when this api endpoint will be call using axios 
   then the controller ie. createTaskController will get execute and inside this controller we have 
   written the logic how to create a new Todo task in the database.
  
   And we are passing verifyToken middleware because only after verification of the token we will allow the user
   to create the todo-list ie. before going to create, we want to check the user is verified or not. 
*/
router.post("/create-task", verifyToken, createTodoListController);
{
  /* ****************************************** */
}
{
  /* Creating the update and the delete button. */
}

<div className="flex justify-around mt-9 mb-4">
  {/* */}

  {/* Creating a Update react-icon and providing Update text along with it and we are 
              passing two functions Display() and updateCardIndex().
              When the Update icon will be click then Display() and updateCardIndex() function will get execute.
              In Display() function we have written the logic to display a form to update the contents of the
              todo-list.
              In storeCardIndex() function we have written the logic to store the index of that card whose
              details the user wants to update in an array so that we can send this index number to the 
              TodoUpdatePage to update the details of that particular todo-list.     
          */}

  <div
    className="flex justify-center items-center px-2 py-1 cursor-pointer uppercase "
    onClick={() => setModal(true)}
  >
    <MdEditSquare
      className="font-bold text-3xl cursor-pointer hover:scale-105 transition-scale 
              text-[#116530] responsive-icon"
    />
    <span className="text-2xl font-bold responsive-text"> Update </span>
  </div>

  {/* Creating a delete react-icon and providing Delete text along with it.
              We are passing(calling) the function deleteIndexNumber() that we are receiving as props 
              from the TodoList component. When the Delete icon will be click then deleteCardId() 
              function will get execute where we have written the logic to delete a particular todo list on 
              basis of the id of that todo list.       
          */}

  <div
    className="flex justify-center items-center px-2 py-1 cursor-pointer uppercase"
    onClick={deleteTodoList}
  >
    <RiDeleteBin5Line
      className="font-bold text-3xl cursor-pointer hover:scale-105 transition-scale
              text-[#a83737] responsive-icon"
    />
    <span className="text-2xl font-bold responsive-text"> Delete </span>
  </div>

  {/* */}
</div>;

/*

    Steps to use firebase :


    1. 1st create a project.

    2. Allow authentication such as google, facebook etc.

    3. Create storage by writing the rules to :

       To use storage of firebase we have to do some changes in our firebase account such as :

  
       match /{allPaths=**} {    
      
          allow read;
          allow write: if 
          request.resource.size < 2 * 1024 * 1024 && 
          request.resource.contentType.matches("image/.*")
      
       }



   4. Install firebase in the client-side by writing    ->   npm install firebase

   5. Then make a file ex. firebase.js and paste the firebase code from firebase.com as it is inside it.

   6. Then by importing inbuilt methods of firebase we can create many things according to our need.
   
        Ex: 
          To work with firebase storage we have to import from "firebase/storage"
          To work with firebase authentication we have to import from "firebase/auth"

   7. Add domain name in the authentication -> settings -> Authorised domains -> add the domain 
      if using with a live domain.



*/

{
  /* **************************************************************************************/
}
{
  /* Dynamically accessing the above ContentArray of the useState() using map function 
              and passing all its data's in the item parameter and index's in index parameter.
              And using the TodoCard component to display the card we created 
              in TodoCards.js.
        
          ie. After successfully adding the contents in the ContentArray we will display the Todo Card.
              And passing the item, index number and a function to delete a particular todo 
              list to the child component ie. TodoCard component so that we can make the Todo card
              with those details and display it here.
          */
}

<div className="row mt-2 mb-2 p-3">
  {/* */}

  {ContentArray &&
    ContentArray.map((item, index) => (
      /* */

      <div
        key={index}
        className="my-2 col-lg-3 col-md-2 col-10 ml-[80px] pb-[40px] responsive-card"
      >
        {/* */}

        <TodoCard item={item} cardId={item._id} />

        {/* */}
      </div>

      /* */
    ))}

  {/* */}
</div>;

{
  emailVerified ? (
    <div className="text-center mt-4">
      {/* */}

      <h1 className="text-3xl font-semibold font-sans">
        You have successfully verified your email. Now you can login to your
        account
      </h1>

      <Link to="/signIn">
        <button
          className="bg-slate-700 text-[19px] font-semibold font-sans text-white rounded-lg mt-4
        uppercase hover:opacity-95 disabled:opacity-80 py-3 px-[25px] mb-4 w-[20%] 
        responsive-login-button"
        >
          Login
        </button>
      </Link>

      {/* */}
    </div>
  ) : (
    ""
  );
}
