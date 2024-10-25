import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json());
const client = new PrismaClient();
//add a new item
app.post("/item", async (req, res) => {
  const { item, quantity, unitprice } = req.body;
  try {
    const newItem = await client.budget.create({
      data: {
        item,
        quantity,
        unitprice,
      },
    });

    res.status(201).json({ message: "added an item", data: newItem });
  } catch (error) {
    res.status(500).json({ error: "error adding item" });
  }
});
//get all items
app.get("/items", async (req, res) => {
  try{
    const allItems=await client.budget.findMany();
    if(allItems.length <= 0){
      res.status(204).json({message:"you dont have items" })

    }
    else{
     res.status(200).json({data:allItems})
    }
  }catch(e){
    res.status(500).json({message:"server error"})
  }
  res.send("getting all items");
});
//get single item
app.get("/items/:item", async (req, res) => {
  const item= req.params.item;
  try{
    const budget=await client.budget.findFirst({
      where:{item:item}
    })
    if(!item){
      res.status(404).json({message:"item not found"})
    }
    else{
      res.status(200).json({data:item});
    }
  }catch(e){
    res.status(500).json({message:"server error"})
  }
});
//update item
app.patch("/items/:item", async (req, res) => {
  const {
    item,
    quantity,
    unitprice,
  } = req.body;

  try {
    let updatedItem;
    const wantedItem = req.params.item;

    if (item) {
      updatedItem = await client.budget.update({
        where: { item: wantedItem },
        data: { item: item }
      });
    }

    if (quantity) {
      updatedItem = await client.budget.update({
        where: { item: wantedItem },
        data: { quantity: quantity }
      });
    }

    if (unitprice) {
      updatedItem = await client.budget.update({
        where: { item: wantedItem },
        data: { unitprice: unitprice }
      });
    }

    res.status(200).json({ message: "Update successful", updatedItem });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete item
app.delete("/items/:item",async (req, res) => {
  const item =req.params.item;
  try{
const deleteditem =await client.budget.delete({
where :{item:item}
});
res.status(200).json({message:"item deleted succesfully"})
  }catch(e){
    res.status(500).json({message:"server error"})
  }
});




app.listen(2000, () => {
  console.log("Server is running on port 2000..");
});
