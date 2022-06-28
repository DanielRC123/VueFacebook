//const API = "https://api.github.com/users/";
const API = "https://graph.facebook.com/v14.0/"; 
const TOKEN = "?fields=id,name,email,picture&access_token=EAAJ6RLJPYeUBAAaMZBZB3GOl4jIsqqjoobkY5i6cgARcUIQJ3vXQSsD3qt77dJ4J9pgPOVyOMZBKRVoKRZCrFbpZCQtZBEQuff3o50NDtjA1NpCjWln8cOddEClHfInPaCFmmUqnbshn4xv6mRTId03ZCefPkIvTRDg08Tk4czKsfjcCahmZBHkW96N4D4H74V9VYaQsgfBFLPyxlaQVPbc1L4MIbRiG7IapzkjdZCgMp8vk3zyZCrO6gy";
// const TOKEN = "?fields=id,name,picture&access_token=EAAIHQhIvwlkBADVyaZAwFAzngLn20ZBE3ufb5pPAKvuVN5qAdFV8iIq7JkP09wQGr8IqFnngpJxydpKITFtBeF1L9U9SN8O2tU3DAuquRQsg7bZBTs0SUkFzyCf6DrKxhk1HQAWVBZCuzaYF8a7ZBahioEQaOpwrQTvZCB7frQ6jDXgkVKB6ip"
const app = Vue.createApp({
  data() {
    return {
      busqueda: null,
      resultado: null,
      fail: null,
      favoritos: new Map(), //Donde guardaremos los Usuarios favoritos
      estado:false,
  
    }
  },
  created(){
    const FavoritosGuardados = JSON.parse(window.localStorage.getItem("favoritos"))

    if(FavoritosGuardados?.length){
      const favoritosRebuild = new Map(

        FavoritosGuardados.map(alias =>[alias.id,alias]))

        this.favoritos = favoritosRebuild
        console.log(this.favoritos)
      
    }
  },
  computed:{
    esFavorito(){
      return this.favoritos.has(this.resultado.id)
    },
    todosFavoritos(){
      return Array.from(this.favoritos.values())
    },

  },

  methods: {
    
    estadoBuscar(){
     this.estado = !this.estado
    },
    
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