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
import { IProduct } from "@/types/product"
import { Plus, } from "lucide-react"
import { useForm } from "react-hook-form"

export function CardWithForm() {
  const {register, handleSubmit, reset, formState: {errors}} = useForm<IProduct>()
  async function onSubmit (data:IProduct) {
     console.log(data)
  }
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
              {errors.title && <span className="bg-red-500">This field is required</span>}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex">
        <Button onClick={handleSubmit(onSubmit)} type="submit"><Plus />Save Product</Button>
      </CardFooter>
    </Card>
  )
}
