---
sidebar_position: 3
---

# Platform Pages

These is a small page on what each page is supposed to do.

## Homepage

<!-- Add a screenshot of the Homepage -->

In **Homepage**, you can see which machines are currently running and you can upload a dataset to the database.

## Images

<!-- Add a screenshot of the Images page -->

In **Images**, you can see the available images that were build on the platform in the past and you can start them by giving them a name. There is also a button that takes you to a seperate page, in which you can build your own custom image!

### Build an Image

<!-- Add a screen of the Build an Image page -->

In **Build an Image**, you can create your own, custom image for the Docker machine! Just set the programming language and the dataset and write the function(s) you wan to produce.

### Example code

These are small snippets of code that can run on the Revelations platform.

```py title=Python
@lru_cache(2000)
@app.get("/api/v2")
async def default():
    return {"message": "Hello World!"}
```

This returns the message Hello World to the end user. ``lru_cache`` keeps a cache for the last 2000 of the response so it will not do unnessary operations and ``@app.get("/api/v2")`` is the route.

To check if it works simply run ``curl <ipaddress>:8000/api/v2`` and it should return ``Hello World!`` back!
