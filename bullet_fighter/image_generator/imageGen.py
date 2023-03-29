import datetime
import configparser
from base64 import b64decode
import webbrowser
import openai
from openai.error import InvalidRequestError
import os

def generate_image(prompt, num_image, size, output_format='url'):
    """
    params:
        prompt (str):
        num_image (int):
        size (str):
        output_format (str):
    """
    try:
        images = []
        response = openai.Image.create(
            prompt=prompt,
            n=num_image,
            size=size,
            response_format=output_format
        )
        if output_format == 'url':
            for image in response['data']:
                images.append(image.url)
        elif output_format == 'b64_json':
            for image in response['data']:
                images.append(image.b64_json)
        return {'created': datetime.datetime.fromtimestamp(response['created']), 'images': images}
    except InvalidRequestError as e:
        print(e)

def callImageGenerator(theme, imgSize="1024x1024"):
    theme += " themed top down video game map" 

    # you will need to make sure that you have the assigned
    openai.api_key = os.getenv('OPENAI_API_KEY')

    # SIZES = ('1024x1024', '512x512', '256x256')

    # theme = input("Enter Theme: ") + " themed top down video game map" 
    # print(theme) 

    # generate images (url outputs)
    response = generate_image(theme, num_image=1, size=imgSize)
    response['created']
    images = response['images']
    return images[0]

    ## generate images (byte output)
    # response = generate_image(theme, num_image=1, size=imgSize, output_format='b64_json')
    # prefix = 'demo'
    # for indx, image in enumerate(response['images']):
    #     with open(f'{prefix}_{indx}.jpg', 'wb') as f:
    #         f.write(b64decode(image))