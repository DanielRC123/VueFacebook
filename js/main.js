//const API = "https://api.github.com/users/";
const API = "https://graph.facebook.com/v14.0/"; 
const TOKEN = "?fields=id,name,email,picture&access_token=GGQVlhc25VbVZA1TWNVZAldZAVEUtaDhpYWszSGJjeFpmZAkd0LXVNekt3eWtzNDVGN1VheXNvUjZAHLUZAybzREUFNIb0pndGFTVG9JeExhSnZAWOG8tdXZAoS1haeHQ3Sk9VczR0ang1NXRfOVE1Tm9tTW1lel9GMDR3RkpzckZA1MVZANNTZAtZAwZDZD";
// const TOKEN = "?fields=id,name,picture&access_token=EAAIHQhIvwlkBADVyaZAwFAzngLn20ZBE3ufb5pPAKvuVN5qAdFV8iIq7JkP09wQGr8IqFnngpJxydpKITFtBeF1L9U9SN8O2tU3DAuquRQsg7bZBTs0SUkFzyCf6DrKxhk1HQAWVBZCuzaYF8a7ZBahioEQaOpwrQTvZCB7frQ6jDXgkVKB6ip"
const app = Vue.createApp({
  data() {
    return {
      busqueda: null,
      resultado: null,
      fail: null,
      favoritos: new Map() //Donde guardaremos los Usuarios favoritos
  
    }
  },

  computed:{
    esFavorito(){
      return this.favoritos.has(this.resultado.id)
    },
    todosFavoritos(){
      return Array.from(this.favoritos.values())
    }
  },
  methods: {
    
    async Buscar(){
      try{

        const response = await fetch(API + this.busqueda + TOKEN)
        console.log(response)
        // throw significa que lanzará un nuevo error , al cumplirse la condición
        if(!response.ok) throw new Error("Usuario de Facebook inexistente, Ingrese nuevamente el id")
        const data = await response.json()
        this.resultado = data
        this.fail = null
        console.log(data)

      }
      catch(error){
        this.fail = error
        this.resultado = false

      }
      //Finalmente se recomienta limpiar el cache de la instancia de vue
      finally{
        this.busqueda=null
      }
    },
    addFavorito(){
      this.favoritos.set(this.resultado.id,this.resultado)
      this.UpdateStorage()
    },
    removeFavorito(){
      this.favoritos.delete(this.resultado.id)
      this.UpdateStorage()

    },
    //se pretende guardar en cache la información de los favoritos, de manera persistente
    UpdateStorage(){
      window.localStorage.setItem('favoritos',JSON.stringify(this.todosFavoritos))
    }
}
})