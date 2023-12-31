/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        hvnter: ["HVNTER"],
        'avenir-bold': ["AVENIRNEXT-BOLD"],
        'avenir-demi': ["AVENIRNEXT-DEMIBOLD"],
        'avenir-medium': ["AVENIRNEXT-MEDIUM"],
        'avenir-regular': ["AVENIRNEXT-REGULAR"],
      },
    },
  },
  daisyui: {
    themes: [
      {
        mine: {
        
          "primary": "#77ce48",
                  
          "secondary": "#bb87db",
                  
          "accent": "#b7f274",
                  
          "neutral": "#252334",
                  
          "base-100": "#e9e7ee",
                  
          "info": "#7690e0",
                  
          "success": "#43d083",
                  
          "warning": "#a27d11",
                  
          "error": "#e72329",
        },
        woosh: {
          
          "primary": "#E65F5C",
                   
          "secondary": "#00ca00",
                   
          "accent": "#00eeba",
                   
          "neutral": "#082c2e",
                   
          "base-100": "#242329",
                   
          "info": "#0073d2",
                   
          "success": "#009f76",
                   
          "warning": "#a28400",
                   
          "error": "#ff5779",
                   },
      },
      "light",
      "dark",
      "coffee",
      "garden",
      "retro",
      "business",
      "winter",
      "emerald",
      "luxury",
      "acid",
      "autumn",
      "cmyk",
      "nord",
      "synthwave",
      "black"

    ],
  },
  plugins: [require("daisyui")],
}

