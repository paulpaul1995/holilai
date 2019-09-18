from App.models import Category


def base():
    categorys = Category.objects.filter(parentid=0)
    print(categorys)
    return categorys