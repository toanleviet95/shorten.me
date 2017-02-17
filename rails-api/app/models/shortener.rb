require 'uri'

class Shortener < ApplicationRecord
  has_many :visitors
  validates :given_url, presence: true, :format => {:with => URI.regexp}

  before_save :set_slug

  private

  def set_slug

    self.slug = 6.times.map { [*'0'..'9', *'a'..'z'].sample }.join

  end
end
