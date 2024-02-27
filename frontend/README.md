

* *Last Modification Date*: 7 February 2023
* *Assignment URL*: <https://fancy-seahorse-87b2c6.netlify.app/>
* *Git URL*: <https://git.cs.dal.ca/kmakwana/csci-4177-5709-assignments/-/tree/main/A1?ref_type=heads>

## Authors

* [Kunal Rajeshkumar Makwana](kn362288@dal.ca)


## Built With

* [React](https://legacy.reactjs.org/docs/getting-started.html/) - The web framework used
* [npm](https://docs.npmjs.com//) - Dependency Management

## Sources Used

### input.jsx

*Lines 2 - 33*

```
export const Email = () =>{
    return(
        <div>
          <label className="block text-gray-700 font-semibold">Email Address</label>
          <input type="email" name="" id="" placeholder="Enter Email Address" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border border-gray-700 focus:border-blue-500 focus:bg-white focus:outline-none" autofocus autocomplete required/>
        </div>
    )
}

export const Pwd = () =>{
    return(
        <div className="mt-4">
          <label className="block text-gray-700 font-semibold">Password</label>
          <input type="password" name="" id="" placeholder="Enter Password" minlength="6" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border border-gray-700 focus:border-blue-500
                focus:bg-white focus:outline-none" required/>
        </div>
    )
}

export const GoogleSignIn = () =>{
    return(
        <button type="button" className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300">
            <div className="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" className="w-6 h-6" viewBox="0 0 48 48"><defs><path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/></defs><clipPath id="b"><use xlink:href="#a" overflow="visible"/></clipPath><path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"/><path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/><path clip-path="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"/><path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/></svg>
            <span className="ml-4">
            Log in
            with
            Google</span>
            </div>
          </button>
    )
}
```

The code above was created by using the code in [Tailwind Components for forms](https://tailwindcomponents.com/component/login-page-4) as shown below: 

```
<section class="flex flex-col md:flex-row h-screen items-center">

  <div class="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
    <img src="https://source.unsplash.com/random" alt="" class="w-full h-full object-cover">
  </div>

  <div class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center">

    <div class="w-full h-100">


      <h1 class="text-xl md:text-2xl font-bold leading-tight mt-12">Log in to your account</h1>

      <form class="mt-6" action="#" method="POST">
        <div>
          <label class="block text-gray-700">Email Address</label>
          <input type="email" name="" id="" placeholder="Enter Email Address" class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autofocus autocomplete required>
        </div>

        <div class="mt-4">
          <label class="block text-gray-700">Password</label>
          <input type="password" name="" id="" placeholder="Enter Password" minlength="6" class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none" required>
        </div>

        <div class="text-right mt-2">
          <a href="#" class="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">Forgot Password?</a>
        </div>

        <button type="submit" class="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6">Log In</button>
      </form>

      <hr class="my-6 border-gray-300 w-full">

      <button type="button" class="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300">
            <div class="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="w-6 h-6" viewBox="0 0 48 48"><defs><path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/></defs><clipPath id="b"><use xlink:href="#a" overflow="visible"/></clipPath><path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"/><path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/><path clip-path="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"/><path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/></svg>
            <span class="ml-4">
            Log in
            with
            Google</span>
            </div>
          </button>

      <p class="mt-8">Need an account? <a href="#" class="text-blue-500 hover:text-blue-700 font-semibold">Create an
              account</a></p>


    </div>
  </div>

</section>

```


- The code in [Tailwind CSS UI Components](https://tailwindui.com/components/application-ui/forms/form-layouts) was implemented by thoroughly studying the original source and understanding its functionality and logic. Then, I adapted the code to suit the requirements of my assignment.


- [Form Layouts - Official Tailwind CSS UI Components](https://tailwindui.com/components/application-ui/forms/form-layouts)'s Code was used because I believed it would be a helpful reference for the starting point for my assignment. 

### landing-body.jsx
*Lines 7-30* 
```
<div className="mb-8 md:mb-0 md:w-full lg:w-2/4 text-center">
        <h2 className="text-4xl md:text-6xl lg:text-6xl font-extrabold leading-tight text-black-600 mb-6">
          <span className="text-5xl">Explore with</span>
          <br className="hidden md:inline" />
          <span className="text-indigo-500 text-5.2xl"> EduHub</span>
        </h2>
        <br></br>
        <p className="mt-4 mb-10 text-lg md:text-xl lg:text-xl leading-relaxed font-semibold text-4xl">
          Join a hub of
          <span className="text-blue-400"> exploration, creativity, </span>
            and 
          <span className="text-pink-400"> academic brilliance. </span>
          
          <span className="text-green-400">
            &nbsp;Begin your educational adventure with EduHub.
          </span>
          &nbsp;Your journey starts here! 🔐
        </p>

        <p className="text-black text-2xl font-bold mt-12">
          💡 Ignite Your Passion 💪
        </p>

      </div>
```

The code above was created by referring to the lists of landing page websites. I have referred to [Github Educational website landing page] (https://github.com/rohitbhadane310/landing-pages/blob/main/educational-web/my-project/src/components/Home.jsx)

```
<div className=" md:w-2/4 text-center">
        <h2 className=" text-5xl font-semibold leading-tight">
          Knowledge with
          <span className="text-brightGreen"> eStudy</span>
        </h2>
        <p className=" text-lightText mt-5 text-start">
          eStudy is your gateway to a world of limitless learning possibilities.
          With our cutting-edge eLearning platform, you can explore a vast
          library of courses, from academic subjects to practical skills, all
          designed to help you achieve your goals.
        </p>

        <Link to="contact" spy={true} smooth={true} duration={500}>
          <Button title="Contact Us" />
        </Link>
      </div>
```
By studying the original code and applying what I learned, I was able to modify the layout and styling to fit the desired design. I have added the more styles and colors to the description of the website. Moreover i have made it fully responsive by inserting the styles for width and height. 

### about.jsx
*Lines 9-14*
```
    <div className="md:min-h-screen flex flex-col-reverse md:flex-row items-center gap-5 md:mx-32 mx-5 mt-14">
      <div className="w-full md:w-2/4">
        <img src={aboutImage} alt="about-img" />
      </div>

      <div className="w-full md:w-2/4 text-center space-y-2">
```
The code above was created by referring to the lists of landing page websites. I have referred to [Github Educational website landing page] (https://github.com/rohitbhadane310/landing-pages/blob/main/educational-web/my-project/src/components/about.jsx)

```
    <div className=" md:min-h-screen flex flex-col-reverse md:flex-row items-center gap-5 md:mx-32 mx-5 mt-14">
      <div className=" w-full md:w-2/4">
        <img src={img} alt="img" />
      </div>

      <div className="w-full md:w-2/4 text-center space-y-2">
        <Heading title1="About" title2="Us?" />
```

By studying the original code and applying what I learned, I was able to modify the layout and styling to fit the desired design. I have referred to the above code in order to understand the layout for about us and how can i design the layout with image and description together. I have added the code to make it responsive according to the width of mobile, tablet and laptop.





## Acknowledgments

* The example given was very useful and proved to be the basis for understanding it’s functionality, operation logic.
 I appreciate their labour and diligence.
* It offered helpful insights and shaped how I view approaches that are employed in understanding people’s ways of learning specific techniques. Their contribution is much appreciated.
