

export interface IList {
    id?: number;
    Name? : String ;
    Project?  : String ;
	  
   
  }
  export class List implements IList {
    constructor(
     public id?: number,
     public Name? : String  ,
	   public Project?  : String ,
	 
    ) {}
  }