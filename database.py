from app.models import User, RecipeCategory, Recipe
from app import app, db
from dotenv import load_dotenv
load_dotenv()


with app.app_context():
    db.drop_all()
    db.create_all()

    # Users User.create(first_name='', last_name='', email='', password='')
    fork = User.create(first_name='Fork', last_name='App',
                       email='fork@fork.io', password='fork')
    ben = User.create(first_name='Ben', last_name='Anderson',
                      email='andersjbe@gmail.com', password='fork')
    ian = User.create(first_name='Ian', last_name='Bentley',
                      email='ian@aa.io', password='fork')
    javier = User.create(first_name='Javier', last_name='Ortiz',
                         email='javier@aa.io', password='fork')
    dean = User.create(first_name='Dean', last_name='Dean',
                       email='dean@aa.io', password='fork')
    angela = User.create(first_name='Angela', last_name='Lansbury',
                         email='angela@aa.io', password='fork')

    db.session.add(fork)
    db.session.add(ben)
    db.session.add(ian)
    db.session.add(javier)
    db.session.add(dean)
    db.session.add(angela)

    # Recipe Categories RecipeCategory(category='')
    asian = RecipeCategory(category='Asian')
    beef = RecipeCategory(category='Beef')
    bread = RecipeCategory(category='Bread')
    breakfast = RecipeCategory(category='Breakfast')
    chicken = RecipeCategory(category='Chicken')
    dessert = RecipeCategory(category='Dessert')
    indian = RecipeCategory(category='Indian')
    lamb = RecipeCategory(category='Lamb')
    mexican = RecipeCategory(category='Mexican/Hispanic')
    misc = RecipeCategory(category='Miscellaneous')
    pasta = RecipeCategory(category='Pasta')
    pork = RecipeCategory(category='Pork')
    salad = RecipeCategory(category='Salad')
    seafood = RecipeCategory(category='Seafood')
    soup = RecipeCategory(category='Soup')
    vegan = RecipeCategory(category='Vegan')
    vegetarian = RecipeCategory(category='Vegetarian')

    db.session.add(asian)
    db.session.add(beef)
    db.session.add(bread)
    db.session.add(breakfast)
    db.session.add(chicken)
    db.session.add(dessert)
    db.session.add(indian)
    db.session.add(lamb)
    db.session.add(mexican)
    db.session.add(misc)
    db.session.add(pasta)
    db.session.add(pork)
    db.session.add(salad)
    db.session.add(seafood)
    db.session.add(soup)
    db.session.add(vegan)
    db.session.add(vegetarian)

    beef_bourguignon_data = {
        'title': "Julia Child's Beef Bourguignon",
        'description': "There are some recipes that are worth the wait and Julia Child's Beef Bourguignon is one of them. You can’t and shouldn't rush savory, seared beef, and fork-tender vegetables, especially when they simmer a rich full-flavored sauce. When a recipe is this good, there's no need to rush, are we right? Don’t be surprised when this time-honored dish wows your whole crew. There's a reason this beef bourguignon is a culinary cult-classic, and they’ll see and taste why",
        'ingredients': '''6 slices bacon, cut into lardons | 
        3 1/2 tablespoons extra-virgin olive oil | 
        3 pounds stewing beef, cut into 2-inch cubes | 
        1 large carrot, sliced | 
        1 large white onion, sliced | 
        1 pinch coarse sea salt and freshly ground pepper | 
        2 tablespoons all purpose flour | 
        3 cups red wine, like a chianti | 
        2 1/2 to 3 1/2 cups beef stock | 
        1 tablespoon tomato paste | 
        2 cloves smashed garlic | 
        1/2 teaspoon thyme | 
        1 crumbled bay leaf | 
        18 to 24 small pearl onions | 
        3 1/2 tablespoons butter | 
        1 herb bouquet (4 sprigs parsley, 2 sprigs thyme, 1 bay leaf) | 
        1 pound fresh white mushrooms, quartered
        ''',
        'instructions': 'Simmer bacon lardons in 4 cups water for 10 minutes (Lardon is the French culinary term referring to thin strips of bacon, cut approximately 1/4-inch thick). Drain and pat dry.\r\nPreheat oven to 450°F. In a large Dutch oven, sauté the bacon in 1 tablespoon of oil for about 3 minutes, until it starts to lightly brown. Remove with a slotted spoon and set aside.\r\nDry the beef with a few paper towels for better browning. In batches, sear the beef on all sides in the Dutch oven. Set aside with the bacon.\r\nBack in the pot, add the sliced carrots and onions; sauté in fat until browned, about 3 minutes. If there\'s any excess fat, drain it now.\r\nAdd the bacon and beef back to the pot. Season with 1/2 teaspoon coarse salt and 1/4 teaspoon ground pepper. Toss. Sprinkle with flour and toss once more. Place in the center of the oven for 4 minutes.\r\nRemove pot from oven; toss beef and place back in the oven for 4 more minutes. Remove the pot from the oven and reduce the heat to 325°F.\r\nTo the pot, add the wine and stock. The liquid should barely cover the meat and vegetables. Add the tomato paste, garlic and thyme. Bring to a light simmer on the stove, then cover and simmer in the lower part of the oven for 3 to 4 hours, or until the meat is easily pierced.\r\nIn the last hour of cooking, bring 1 1/2 tablespoons butter and 2 teaspoons oil to a medium heat in a sauté pan. Add the pearl onions and toss around in the fat until they\'ve browned, 10 minutes. Then stir in 1/2 cup beef stock, a small pinch of salt and pepper and the herb bouquet. Reduce the heat to low and simmer the onions for about 40 minutes, until the liquid has evaporated, and the onions are tender.\r\nRemove the onions and set aside. Discard the herb bouquet and wipe out the skillet. Add the remaining butter and oil and bring to a medium heat.\r\nAdd the mushrooms and cook for about 5 minutes, shaking the pan to coat with the butter.\r\nPlace a colander over a large pot. Drain the beef stew through the colander and into the pot. Place the pot with the sauce over a medium heat and simmer for about 5 minutes, skimming any fat on top. Pour the beef and vegetables back into the Dutch oven. Add the pearl onions and mushrooms to the pot. Pour the sauce over the beef mix and simmer an additional 3 to 5 minutes.',
        'image_src': 'https://images-gmi-pmc.edge-generalmills.com/42fb4d81-8d92-40e2-9f0a-524edce5ca74.jpg',
        'from_url': 'https://www.tablespoon.com/recipes/julia-childs-beef-bourguignon/cdda3ccc-3623-4363-8095-aaca1a3f8313',
        'user_id': 3,
        'category_id': 2
    }

    beef_bourguignon = Recipe(**beef_bourguignon_data)
    db.session.add(beef_bourguignon)

    db.session.commit()
