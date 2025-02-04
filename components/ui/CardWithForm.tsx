"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UploadDropzone } from "@/lib/uploadthing"
import { IProduct } from "@/types/product"
import { FileText, Pencil, Plus, } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { useForm } from "react-hook-form"

export function CardWithForm() {
  const {register, handleSubmit, reset, formState: {errors}} = useForm<IProduct>()
  async function onSubmit (data:IProduct) {
    data.productPdfUrl= pdfUrl
    data.productImageUrl = imageUrl
    console.log(data)
     reset()
  }
  const [pdfUrl, setPdfUrl] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>File Upload With Upload Thing</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Product Title</Label>
              <Input id="name" placeholder="Title of your Product"
              {...register('title', {required:true})}    
              />
              {errors.title && <span className="text-red-500">This field is required</span>}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        {/* pdf upload */}
        <div className="flex space-y-2 flex-col">
          {/* Image upload */}
          {imageUrl ? (
            <>
            <section className="flex justify-between items-center">
            <p className="text-sm">Product Image</p>
            <Button onClick={() =>{setImageUrl('')}}><Pencil />Change Image</Button>
            </section>
            <div className="w-72 h-36 relative">
            <Image src={imageUrl} alt="product Image" className="contain" fill/>
            </div>
            </>
            
          ):(
            <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              // console.log("Files: ", res);
              setImageUrl(res[0].url)
              alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
            onUploadBegin={(name) => {
              // Do something once upload begins
              console.log("Uploading: ", name);
            }}
            onDrop={(acceptedFiles) => {
              // Do something with the accepted files
              console.log("Accepted files: ", acceptedFiles);
            }}
          />
          )}
          {pdfUrl ? (
            <>
            <section className="flex justify-between items-center">
            <p className="text-sm">Product Pdf</p>
            <Button onClick={() =>{setPdfUrl('')}}><Pencil />Change Pdf</Button>
            </section>
            <div className="flex justify-center items-center">
            <a href={pdfUrl} className="text-center text-red-500" target="_blank"><span>Preview</span> <FileText size={36}/></a>
            </div>
            </>
            
          ):(<UploadDropzone
          endpoint="pdfUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            // console.log("Files: ", res[0].url);
            setPdfUrl(res[0].url)
            alert("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
          />)}
          <Button onClick={handleSubmit(onSubmit)} type="submit"><Plus />Save Product</Button>
        </div>
      </CardFooter>
      
    </Card>
  )
}
