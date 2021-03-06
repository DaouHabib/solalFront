import { Component, OnInit } from '@angular/core';
import { ProductSlider } from '../../../shared/data/slider';
import { Product } from '../../../shared/classes/product';
import { ProductService } from '../../../shared/services/product.service';
import { Produitservice } from '../../../shared/services/produit.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fashion-one',
  templateUrl: './fashion-one.component.html',
  styleUrls: ['./fashion-one.component.scss']
})
export class FashionOneComponent implements OnInit {

  public products: Product[] = [];
  public productCollections: any[] = [];
  
  constructor(public productService: ProductService ,private porduitService :Produitservice,private http: HttpClient,
    public sanitization: DomSanitizer) {
    this.productService.getProducts.subscribe(response => {
      this.products = response.filter(item => item.type == 'fashion');
      // Get Product Collection
      this.products.filter((item) => {
        item.collection.filter((collection) => {
          const index = this.productCollections.indexOf(collection);
          if (index === -1) this.productCollections.push(collection);
        })
      })
    });
  }
  public collections = [];

  public ProductSliderConfig: any = ProductSlider;

  public sliders = [{
    title: 'Welcome to Ireality',
    subTitle: 'Augmented Réality Store',
    image: 'assets/images/realite-augmentee.jpg'
  }, {
    title: 'Welcome to Ireality',
    subTitle: 'Augmented Réality Store',
    image: 'assets/images/realite-augmentee-smartphones.jpg'
  }]
  createImageFromBlob(image: Blob,produit:any) {
    var  imageToShow:any;
    let reader = new FileReader();
    reader.addEventListener(
        "load",
        () => {
          imageToShow = this.sanitization.bypassSecurityTrustResourceUrl(
                reader.result.toString()
            );
            this.collections.push({
              id: produit._id,
              title: produit.title,
              description:produit.description ,
              type: produit.type,
              brand: produit.brand,
              category:produit.category,
              prix: produit.prix,
              sale: produit.sale,
              discount: produit.discount,
              stock: produit.stock,
              new: produit.new,
              quantity: produit.quantity,
              imageUrl: imageToShow

              },
            
           )
        },
        false
    );

    if (image) {
   reader.readAsDataURL(image);
    }
}
  getImageFromService(produit : any):any {
    console.log(produit);
    this.getImage(produit.imageUrl).subscribe(
        (data) => {
            this.createImageFromBlob(data,produit);
        },
        (error) => {
            console.log(error);
        }
    );
}
  getImage(produit :any): Observable<Blob> {
    console.log(produit);
    return this.http.get(
        
        "http://localhost:3000/uploads/image/"+produit,
        { responseType: "blob" }
    );
}

  // Collection banner
 


  // Blog
  public blog = [{
    image: 'assets/images/blog/1.jpg',
    date: '25 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/2.jpg',
    date: '26 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/3.jpg',
    date: '27 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/4.jpg',
    date: '28 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }];

  // Logo
  public logo = [{
    image: 'assets/images/logos/1.png',
  }, {
    image: 'assets/images/logos/2.png',
  }, {
    image: 'assets/images/logos/3.png',
  }, {
    image: 'assets/images/logos/4.png',
  }, {
    image: 'assets/images/logos/5.png',
  }, {
    image: 'assets/images/logos/6.png',
  }, {
    image: 'assets/images/logos/7.png',
  }, {
    image: 'assets/images/logos/8.png',
  }];

  ngOnInit(): void {
    this.porduitService.getAll().subscribe(res=>{
      res.forEach(element => {
    this.getImageFromService(element);
    });
    })
  }

  addToCart(product: any) {
    this.productService.addToCart(product);
  }

  addToWishlist(product: any) {
    this.productService.addToWishlist(product);
  }

  addToCompare(product: any) {
    this.productService.addToCompare(product);
  }
  // Product Tab collection
  getCollectionProducts(collection) {
    return this.products.filter((item) => {
      if (item.collection.find(i => i === collection)) {
        return item
      }
    })
  }
  
}
