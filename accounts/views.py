from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from .models import Customer, Designer


# =========================================================
# HOME
# =========================================================

def home(request):

    if "customer_id" in request.session:
        return redirect("customer_dashboard")

    if "designer_id" in request.session:
        return redirect("designer-dashboard")

    if "admin_id" in request.session:
        return redirect("admin-dashboard")

    return render(request, 'accounts/home.html')


# =========================================================
# LOGIN SELECTION
# =========================================================

def login_selection(request):
    return render(request, 'accounts/login_selection.html')


# =========================================================
# CUSTOMER LOGIN
# =========================================================

def customer_login(request):

    if request.method == "POST":

        email = request.POST.get("email")
        password = request.POST.get("password")
        remember_me = request.POST.get("remember_me")

        try:
            customer = Customer.objects.get(email=email)

            if check_password(password, customer.password):

                request.session["customer_id"] = customer.id
                request.session["customer_name"] = customer.name

                # Remember Me
                if remember_me:
                    # Keep the customer logged in for 14 days
                    request.session.set_expiry(60 * 60 * 24 * 14)
                else:
                    # Session ends when the browser session ends
                    request.session.set_expiry(0)

                

                return redirect("customer_dashboard")

            else:
                messages.error(
                    request,
                    "Invalid Password!"
                )

        except Customer.DoesNotExist:

            messages.error(
                request,
                "Email does not exist!"
            )

    return render(
        request,
        "accounts/customer_login.html"
    )

# =========================================================
# DESIGNER LOGIN
# =========================================================

def designer_login(request):

    if request.method == "POST":

        email = request.POST.get("email")
        password = request.POST.get("password")

        try:
            designer = Designer.objects.get(email=email)

            if check_password(password, designer.password):

                request.session["designer_id"] = designer.id
                request.session["designer_name"] = designer.name

                

                return redirect("designer-dashboard")

            else:
                messages.error(
                    request,
                    "Invalid Password!"
                )

        except Designer.DoesNotExist:

            messages.error(
                request,
                "Email does not exist!"
            )

    return render(
        request,
        "accounts/designer_login.html"
    )


# =========================================================
# ADMIN LOGIN
# =========================================================

def admin_login(request):

    if request.method == "POST":

        email = request.POST.get("email")
        password = request.POST.get("password")

        try:

            # Find Django user using email
            user = User.objects.get(email=email)

            # Check username + password
            authenticated_user = authenticate(
                request,
                username=user.username,
                password=password
            )

            # Only allow Django superuser
            if (
                authenticated_user is not None
                and authenticated_user.is_superuser
            ):

                request.session["admin_id"] = authenticated_user.id
                request.session["admin_name"] = authenticated_user.username

                
                return redirect("admin-dashboard")

            else:

                messages.error(
                    request,
                    "Invalid admin email or password."
                )

        except User.DoesNotExist:

            messages.error(
                request,
                "Admin email does not exist."
            )

    return render(
        request,
        "accounts/admin_login.html"
    )


# =========================================================
# CUSTOMER REGISTER
# =========================================================

def customer_register(request):

    if request.method == "POST":

        name = request.POST.get("name")
        email = request.POST.get("email")
        phone = request.POST.get("phone")
        password = request.POST.get("password")

        if Customer.objects.filter(email=email).exists():

            messages.error(
                request,
                "Email already exists!"
            )

            return redirect("customer_register")

        customer = Customer(
            name=name,
            email=email,
            phone=phone,
            password=make_password(password)
        )

        customer.save()

        messages.success(
            request,
            "Registration Successful!"
        )

        return redirect("customer_login")

    return render(
        request,
        "accounts/register.html",
        {"role": "Customer"}
    )


# =========================================================
# DESIGNER REGISTER
# =========================================================

def designer_register(request):

    if request.method == "POST":

        name = request.POST.get("name")
        email = request.POST.get("email")
        phone = request.POST.get("phone")
        password = request.POST.get("password")

        if Designer.objects.filter(email=email).exists():

            messages.error(
                request,
                "Email already exists!"
            )

            return redirect("designer_register")

        designer = Designer(
            name=name,
            email=email,
            phone=phone,
            password=make_password(password)
        )

        designer.save()

        messages.success(
            request,
            "Designer Registration Successful!"
        )

        return redirect("designer_login")


    return render(
        request,
        "accounts/register.html",
        {"role": "Designer"}
    )


# =========================================================
# ADMIN REGISTER
# =========================================================

def admin_register(request):

    return render(
        request,
        "accounts/register.html",
        {"role": "Admin"}
    )


# =========================================================
# CUSTOMER DASHBOARD
# =========================================================

def customer_dashboard(request):

    if "customer_id" not in request.session:

        return redirect("customer_login")

    customer = Customer.objects.get(
        id=request.session["customer_id"]
    )

    context = {
        "customer": customer
    }

    return render(
        request,
        "customer/dashboard.html",
        context
    )
# =========================================================
# CUSTOMER PROJECTS
# =========================================================

# =========================================================
# CUSTOMER PROJECTS
# =========================================================

def customer_projects(request):

    if "customer_id" not in request.session:
        return redirect("customer_login")

    return render(
        request,
        "customer/projects.html"
    )
# =========================================================
# CUSTOMER LOGOUT
# =========================================================

def customer_logout(request):

    request.session.pop("customer_id", None)
    request.session.pop("customer_name", None)

    return redirect("home")

# =========================================================
# DESIGNER DASHBOARD
# =========================================================

def designer_dashboard(request):

    if "designer_id" not in request.session:

        return redirect("designer_login")

    designer = Designer.objects.get(
        id=request.session["designer_id"]
    )

    context = {
        "designer": designer
    }

    return render(
        request,
        "designer/dashboard.html",
        context
    )

# =========================================================
# DESIGNER LOGOUT
# =========================================================

def designer_logout(request):

    request.session.pop("designer_id", None)
    request.session.pop("designer_name", None)

    return redirect("home")

# =========================================================
# ADMIN DASHBOARD
# =========================================================

def admin_dashboard(request):

    if "admin_id" not in request.session:

        return redirect("admin_login")

    try:

        admin = User.objects.get(
            id=request.session["admin_id"]
        )

    except User.DoesNotExist:

        request.session.flush()

        return redirect("admin_login")

    context = {
        "admin": admin
    }

    return render(
        request,
        "admin/dashboard.html",
        context
    )

# =========================================================
# ADMIN LOGOUT
# =========================================================

def admin_logout(request):

    request.session.pop("admin_id", None)
    request.session.pop("admin_name", None)

    return redirect("home")

# =========================================================
# DESIGNS
# =========================================================

def designs(request, category=None):

    category_names = {

        'living-room': 'Living Room',

        'bedroom': 'Bedroom',

        'kitchen': 'Kitchen',

        'office': 'Office',

        'custom-designs': 'Custom Designs',

        'dining-room': 'Dining Room',

        'bathroom': 'Bathroom',

        'balcony': 'Balcony',

        'kids-room': 'Kids Room',

        'pooja-room': 'Pooja Room',
    }

    title = category_names.get(
        category,
        'Designs'
    )

    return render(
        request,
        'accounts/designs.html',
        {
            'category': category,
            'title': title,
        }
    )