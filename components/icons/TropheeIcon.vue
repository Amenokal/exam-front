<template>
  <div class="icon">
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
      <g fill="currentColor">
        <path d="M22 8.162v.073c0 .86 0 1.291-.207 1.643c-.207.352-.584.561-1.336.98l-.793.44c.546-1.848.729-3.834.796-5.532l.01-.221l.002-.052c.651.226 1.017.395 1.245.711c.283.393.283.915.283 1.958Zm-20 0v.073c0 .86 0 1.291.207 1.643c.207.352.584.561 1.336.98l.794.44c-.547-1.848-.73-3.834-.797-5.532l-.01-.221l-.001-.052c-.652.226-1.018.395-1.246.711C2 6.597 2 7.12 2 8.162Z"></path>
        <path fillRule="evenodd" d="M16.377 2.347A26.373 26.373 0 0 0 12 2c-1.783 0-3.253.157-4.377.347c-1.139.192-1.708.288-2.184.874c-.475.586-.45 1.219-.4 2.485c.173 4.348 1.111 9.78 6.211 10.26V19.5H9.82a1 1 0 0 0-.98.804l-.19.946H6a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5h-2.65l-.19-.946a1 1 0 0 0-.98-.804h-1.43v-3.534c5.1-.48 6.039-5.911 6.211-10.26c.05-1.266.076-1.9-.4-2.485c-.476-.586-1.045-.682-2.184-.874Zm-3.59 3.46a.75.75 0 0 1 .463.693v4a.75.75 0 0 1-1.5 0V8.31l-.22.22a.75.75 0 1 1-1.06-1.06l1.5-1.5a.75.75 0 0 1 .817-.163Z" clipRule="evenodd"></path>
      </g>
    </svg>
    <span class="hidder">
      <p><slot/></p>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.icon {
  width: max-content;
  height: max-content;
  position: relative;

  svg {
    height: 4rem;
    width: 4rem;
  }
  
  &.gold, &.gold p {    
    color: gold;

  }
  &.silver, &.silver p {
    color: silver;
  }
  &.bronze, &.bronze p {
    color: burlywood;
  }
}


.hidder {
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  top: .7rem;
  left: 1.1rem;
  display: flex;
  justify-content: center;
  margin-left: 3%;
  
  
  p {
    position: relative;
    top: -5%;
    margin-left: 10%;
    font-size: 1.25rem;
    font-weight: 700;
    text-align: center;
    width: max-content;
  }
}
</style>