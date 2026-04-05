"""MiniMax client for TradingAgents - Standalone version with OpenAI compatible interface."""
import os
import warnings
from typing import Any, Optional

from langchain_openai import ChatOpenAI


def normalize_content(response):
    """Normalize LLM response content to a plain string."""
    content = response.content
    if isinstance(content, list):
        texts = [
            item.get("text", "") if isinstance(item, dict) and item.get("type") == "text"
            else item if isinstance(item, str) else ""
            for item in content
        ]
        response.content = "\n".join(t for t in texts if t)
    return response


class BaseLLMClient:
    """Abstract base class for LLM clients."""

    def __init__(self, model: str, base_url: Optional[str] = None, **kwargs):
        self.model = model
        self.base_url = base_url
        self.kwargs = kwargs

    def get_provider_name(self) -> str:
        """Return the provider name used in warning messages."""
        provider = getattr(self, "provider", None)
        if provider:
            return str(provider)
        return self.__class__.__name__.removesuffix("Client").lower()

    def warn_if_unknown_model(self) -> None:
        """Warn when the model is outside the known list for the provider."""
        if self.validate_model():
            return
        warnings.warn(
            f"Model '{self.model}' is not in the known model list for "
            f"provider '{self.get_provider_name()}'. Continuing anyway.",
            RuntimeWarning,
            stacklevel=2,
        )

    def get_llm(self) -> Any:
        """Return the configured LLM instance."""
        raise NotImplementedError

    def validate_model(self) -> bool:
        """Validate that the model is supported by this client."""
        raise NotImplementedError


class NormalizedChatOpenAI(ChatOpenAI):
    """ChatOpenAI with normalized content output."""

    def invoke(self, input, config=None, **kwargs):
        return normalize_content(super().invoke(input, config, **kwargs))


class MiniMaxClient(BaseLLMClient):
    """Client for MiniMax LLM provider.

    MiniMax provides OpenAI-compatible API. Set MINIMAX_API_KEY in environment
    or pass api_key directly.
    """

    def __init__(
        self,
        model: str,
        base_url: Optional[str] = None,
        **kwargs,
    ):
        super().__init__(model, base_url, **kwargs)
        self.provider = "minimax"

    def get_llm(self) -> Any:
        """Return configured ChatOpenAI instance for MiniMax."""
        self.warn_if_unknown_model()
        llm_kwargs = {"model": self.model}

        # MiniMax API base URL
        base_url = self.base_url or "https://api.minimax.chat/v1"
        llm_kwargs["base_url"] = base_url

        # API key from environment or kwargs
        api_key = self.kwargs.get("api_key") or os.environ.get("MINIMAX_API_KEY")
        if api_key:
            llm_kwargs["api_key"] = api_key

        # Forward standard kwargs
        for key in ("timeout", "max_retries", "callbacks", "http_client", "http_async_client"):
            if key in self.kwargs:
                llm_kwargs[key] = self.kwargs[key]

        return NormalizedChatOpenAI(**llm_kwargs)

    def validate_model(self) -> bool:
        """Validate model for MiniMax."""
        # MiniMax supports various models, accept any for now
        return True
