import requests
from abc import ABC, abstractmethod


class BaseScheduler(ABC):
    """
        Shared params needed for all platforms, should be overwritten in the platform
        specific class
    """
    api_url = None
    meeting_path = None

    @classmethod
    def parse_response(cls, data):
        """
            Override this method if any fields in Platform's meeting info needs to be changed
        """
        return data

    @classmethod
    def create_url(cls):
        return cls.api_url + cls.meeting_path

    @classmethod
    @abstractmethod
    def create_payload(cls):
        """
            Create and return dict to be used as json body for the Platform Specific
            API request to create a meeting
        """
        raise Exception('Should be implemented by platform specific scheduler')

    @classmethod
    @abstractmethod
    def create_headers(cls):
        """
            Create the required Request headers for the Platform's API to create a meeting
        """
        raise Exception('Should be implemented by platform specific scheduler')

    @classmethod
    def send_create_meeting_request(cls, session):

        payload = cls.create_payload(session)

        response = requests.post(
            cls.create_url(),
            json=payload,
            headers=cls.create_headers()
        )

        if response.status_code > 201:
            raise Exception(f"Scheduling error: \n {str(response.content)} \n")

        meeting_info = cls.parse_response(response.json())
        return meeting_info
