from django.test import TestCase
from django.urls import reverse

class HomeTest(TestCase):
    def test_home_loads(self):
        url = reverse('home')
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'empty body')

# Create your tests here.


